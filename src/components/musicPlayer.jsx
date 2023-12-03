import { useState, useEffect } from "react";

import controls from "./controls.jsx";
import musicMeter from "./musicMeter.jsx";
import musicMeterPin from "./musicMeterPin.jsx";
import musicDuration from "./musicDuration.jsx";
import MusicInfoPage from "./musicInfoPage.jsx";
import MusicQueue from "./musicQueue.jsx";

import "./styles/musicPlayer.css";

const musicPlayerModel = (() => {
	const fetchSongPath = async(id) => {
		return await fetch(`/info/musicPath/${id}`, {
				method: "GET",
			}).then((res) => {
				if(res.ok) {
					return res.json();
				}
				return new Error();
			}).then((res) => {
				return res.musicPath;
			}).catch((err) => {
				alert(`${err}\nAn error has occured`)
				return "#";
			})
	}

	const fetchSongInfo = async(id) => {
		return await fetch(`/info/musicInfo/${id}`)
			.then((response) => {
				if(response.ok) {
					return response.json();
				}
				return new Error();
			}).then((response) => {
				return response;
			}).catch((err) => {
				console.log(err)
				return {
					title: "MusicFetchError",
					artist: "Unknown",
					imgPath: "",
				}
			})
	}

	return {fetchSongPath, fetchSongInfo};
})()

const musicPlayerView = (() => {
	const Controls = controls.render;
	const MusicMeter = musicMeter.render();
	const MusicMeterPin = musicMeterPin.render();
	const MusicDuration = musicDuration.render;

	/* Don't know the React-way to do this :( */
	const syncMusicInfo = ({title, artist, imgPath}) => {
		const elemAlbumArt = document.getElementById("mPlayer__albumArt")
		const elemTitle = document.getElementById("mPlayer__title")
		const elemArtist = document.getElementById("mPlayer__artist")
		
		elemArtist.textContent = artist;
		elemTitle.textContent = title;
		elemAlbumArt.src = imgPath;
	}

	const render = ({progressInterval, changeMusic, currentMusic}) => {
		return (
			<>
				<section id="mPlayer">
					<div className="mPlayer__left">
						<Controls 
							interval={{
								get: progressInterval.get,
								set: progressInterval.set,
							}}
							musicQueue={{
								next: async() => {
									MusicQueue.next()
									currentMusic.set(MusicQueue.getCurrentMusic())
									await changeMusic(MusicQueue.getCurrentMusic())
								},
								previous: async() => {
									MusicQueue.previous()
									currentMusic.set(MusicQueue.getCurrentMusic())
									await changeMusic(MusicQueue.getCurrentMusic())
								}
							}}
						/>
						<MusicDuration/>
					</div>
					<div className="mPlayer__middle">
						<section className="mPlayer__currentPlay"
							onClick = {(e) => {
								currentMusic.set(currentMusic.get + 1)
								console.log(currentMusic.get)
								MusicInfoPage.toggle();
							}}
						>
							<img src="" 
								alt="Music album art"
								className="mPlayer__albumArt"
								id="mPlayer__albumArt"
							/>
							<div className="mPlayer__currentPlayInfo">
								<p className="mPlayer__title" id="mPlayer__title"> 
									No music is being played!
								</p>
								<p className="mPlayer__artist" id="mPlayer__artist"> 
									Unknown 
								</p>
							</div>
						</section>
					</div>
					<div className="mPlayer__right">
						<img src="/icons/playlist.png" alt="musicQueue button" 
							className="icon icon--small"
							onClick={() => {
								MusicQueue.toggle();
						}}/>
						<img src="/icons/upArrow.png" alt="musicInfo button" 
							className="icon icon--small"
							id="musicInfoButton"
							style={{height: "15px"}}
							onClick={(e) => {
								MusicInfoPage.toggle();
						}}/>
					</div>
				</section>
				<MusicMeter />
				<MusicMeterPin />
			</>
		)
	}

	return {render, syncMusicInfo};
})()

export default (() => {
	let model = musicPlayerModel;
	let view = musicPlayerView;
	let elemAudio = document.getElementById("audio");
	let progressInterval = null;
	let currentMusicSetter = null;

	const setMusicSetter =  (setter) => currentMusicSetter = setter;

	const setProgressInterval = (newInterval) => {progressInterval = newInterval}

	const changeMusic = async(nextSongID) => {
		const audioPreviouslyPaused = elemAudio.paused;
		elemAudio.currentTime = 0;

		if(nextSongID != -1) {
			currentMusicSetter(nextSongID)
			const songInfo = await model.fetchSongInfo(nextSongID)
			const songPath = await model.fetchSongPath(nextSongID)

			elemAudio.src = songPath
			elemAudio.load();

			view.syncMusicInfo(songInfo);
			await controls.buttonToggleMusic(progressInterval, setProgressInterval)
			if(audioPreviouslyPaused) controls.togglePlayButton(); 
			musicMeter.reset();
		}
		MusicQueue.sync();
	}

	// Playing song outside the queue will play all music in queue afterwards
	const changeMusicImmediately = async(nextSongID) => {
		MusicQueue.replay();
		await changeMusic(nextSongID);
	}

	elemAudio.addEventListener("ended", () => {
		MusicQueue.next()
		let nextMusic = MusicQueue.getCurrentMusic();
		if(nextMusic != -1) {
			changeMusic(nextMusic);
		} else {
			elemAudio.currentTime = 0;
		}
	})


	const render = ({currentMusic}) => {
		return view.render({
			progressInterval: {
				get: progressInterval,
				set: setProgressInterval,
			},
			changeMusic: changeMusic,
			currentMusic: currentMusic,
		});
	}

	return {render, changeMusic, changeMusicImmediately, setMusicSetter}
})()


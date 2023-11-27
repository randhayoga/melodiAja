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

	const fetchSongInfo = async(id, setter) => {
		useEffect(() => {
			fetch(`/info/musicInfo/${id}`)
			.then((response) => {
				if(response.ok) {
					return response.json();
				}
				return new Error();
			}).then((response) => {
				const {title, artist, imgPath} = response;
				setter({
					title: title,
					artist: artist,
					imgPath: imgPath,
				})
			}).catch((err) => {
				console.log(err)
				setter({
					title: "Error has occured :(",
					artist: "Error",
					imgPath: "",
				})
			})
		}, [])
	}

	return {fetchSongPath, fetchSongInfo};
})()

const musicPlayerView = (() => {
	const Controls = controls.render;
	const MusicMeter = musicMeter.render();
	const MusicMeterPin = musicMeterPin.render();
	const MusicDuration = musicDuration.render;

	const syncMusicInfo = async(id) => {
		const elemAlbumArt = document.getElementById("mPlayer__albumArt")
		const elemTitle = document.getElementById("mPlayer__title")
		const elemArtist = document.getElementById("mPlayer__artist")

		await fetch(`/info/musicInfo/${id}`)
			.then((response) => {
				if(response.ok) {
					return response.json();
				}
				return new Error();
			}).then((response) => {
				const {title, artist, imgPath} = response;
				elemAlbumArt.src = imgPath;
				elemTitle.textContent = title;
				elemArtist.textContent = artist;
			}).catch((err) => {
				console.log(err)
				elemTitle.textContent = "MusicFetchError";
				elemArtist.textContent = "Unknown";
			})
	}

	const render = ({progressInterval, changeMusic}) => {
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
									await changeMusic(MusicQueue.getCurrentMusic())
								},
								previous: async() => {
									MusicQueue.previous()
									await changeMusic(MusicQueue.getCurrentMusic())
								}
							}}
						/>
						<MusicDuration/>
					</div>
					<div className="mPlayer__middle">
						<section className="mPlayer__currentPlay"
							onClick = {(e) => {
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

	const setProgressInterval = (newInterval) => {progressInterval = newInterval}

	const changeMusic = async(nextSongID) => {
		const audioPreviouslyPaused = elemAudio.paused;
		elemAudio.currentTime = 0;

		if(nextSongID != -1) {
			elemAudio.src = await model.fetchSongPath(nextSongID)
			elemAudio.load();
			view.syncMusicInfo(MusicQueue.getCurrentMusic());
			await controls.buttonToggleMusic(progressInterval, setProgressInterval)
			if(audioPreviouslyPaused) controls.togglePlayButton(); 
			musicMeter.reset();
		}
	}

	// Playing song outside the queue will play all music in queue afterwards
	const changeMusicImmediately = async(nextSongID) => {
		MusicQueue.replay();
		await changeMusic(nextSongID);
		view.syncMusicInfo(nextSongID);
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


	const render = () => {
		return view.render({
			progressInterval: {
				get: progressInterval,
				set: setProgressInterval,
			},
			changeMusic: changeMusic
		});
	}

	return {render, changeMusic, changeMusicImmediately}
})()


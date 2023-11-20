import { useState, useEffect } from "react";

import controls from "./controls.jsx";
import musicMeter from "./musicMeter.jsx";
import musicMeterPin from "./musicMeterPin.jsx";
import musicDuration from "./musicDuration.jsx";
import MusicInfoPage from "./musicInfoPage.jsx";
import MusicQueue from "./musicQueue.jsx";

import "./styles/musicPlayer.css";

const musicPlayerModel = (() => {
	const fetchSong = async(id) => {
		return await fetch(`/info/music/${id}`, {
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
			setInterval(() => {
				setter({
					title: "Elysium (Part 1)",
					artist: "We are All Astronauts",
					imgPath: "/defaults/defaultCover1.jpg",
				})
			}, 1000)
		}, [])
	}

	return {fetchSong, fetchSongInfo};
})()

const musicPlayerView = (() => {
	let Controls = controls.render;
	let MusicMeter = musicMeter.render();
	let MusicMeterPin = musicMeterPin.render();
	let MusicDuration = musicDuration.render;

	const render = ({progressInterval, musicInfo, changeMusic}) => {
		let {title, artist, imgPath} = musicInfo.get;
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
								next: () => {
									MusicQueue.next()
									changeMusic(MusicQueue.getCurrentMusic())
								},
								previous: () => {
									MusicQueue.previous()
									changeMusic(MusicQueue.getCurrentMusic())
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
							<img src={imgPath} 
								alt={`${title} album art`} 
								className="mPlayer__albumArt"
							/>
							<div className="mPlayer__currentPlayInfo">
								<p className="mPlayer__title"> {title} </p>
								<p className="mPlayer__artist"> {artist} </p>
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

	return {render};
})()

export default (() => {
	let model = musicPlayerModel;
	let view = musicPlayerView;
	let elemAudio = document.getElementById("audio");
	let progressInterval = null;

	const setProgressInterval = (newInterval) => {progressInterval = newInterval}

	const changeMusic = async(nextSongID) => {
		elemAudio.currentTime = 0;
		if(elemAudio.paused) {
			controls.togglePlayButton();
		}

		if(nextSongID != -1) {
			elemAudio.src = await model.fetchSong(nextSongID)
			await elemAudio.load();
			controls.buttonToggleMusic(progressInterval, setProgressInterval)
			musicMeter.reset();
		}
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


	const render = () => {
		const [musicInfo, setMusicInfo] = useState(
			{
				title: "...",
				artist: "...",
				imgPath: "",
			}
		);

		model.fetchSongInfo(1, setMusicInfo);
		return view.render({
			progressInterval: {
				get: progressInterval,
				set: setProgressInterval,
			},
			musicInfo: {
				get: musicInfo,
				set: setMusicInfo,
			},
			changeMusic: changeMusic
		});
	}

	return {render, changeMusic, changeMusicImmediately}
})()


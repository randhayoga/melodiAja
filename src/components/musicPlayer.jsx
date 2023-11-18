import { useState, useEffect } from "react";

import controls from "./controls.jsx";
import musicMeter from "./musicMeter.jsx";
import musicMeterPin from "./musicMeterPin.jsx";
import musicDuration from "./musicDuration.jsx";
import MusicInfoPage from "./musicInfoPage.jsx";
import MusicQueue from "./musicQueue.jsx";

import "./styles/musicPlayer.css";

const musicPlayerModel = (() => {
	const fetchSong = () => {
		return {};
	}

	const fetchSongInfo = async(id, setter) => {
		useEffect(() => {
			setInterval(() => {
				setter({
					title: "Elysium (Part 1)",
					artist: "We are All Astronauts",
					coverPath: "/defaults/defaultCover1.jpg",
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
		let {title, artist, coverPath} = musicInfo.get;
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
							<img src={coverPath} 
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

	const changeMusic = async(nextSongID) => {
		if(nextSongID != -1) {
			// TODO: Call model.fetchSongInfo instead
			if(elemAudio.getAttribute("src") == "/test-music1.mp3") {
				elemAudio.src = "/test-music2.mp3";
			} else {
				elemAudio.src = "/test-music1.mp3";
			}

			// Only automatically play if change happened when audio player not paused
			await elemAudio.load();
			elemAudio.play();
			musicMeter.reset();
		}
	}

	elemAudio.addEventListener("ended", () => {
		MusicQueue.next()
		changeMusic(MusicQueue.getCurrentMusic());
	})

	const render = () => {
		const [progressInterval, setProgressInterval] = useState(null);
		const [musicInfo, setMusicInfo] = useState(
			{
				title: "...",
				artist: "...",
				coverPath: "",
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

	return {render, changeSong: changeMusic}
})()


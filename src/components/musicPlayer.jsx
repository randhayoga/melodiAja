import { useState, useEffect } from "react";

import controls from "./controls.jsx";
import musicMeter from "./musicMeter.jsx";
import musicMeterPin from "./musicMeterPin.jsx";

import "./styles/musicPlayer.css";

const musicPlayerModel = (() => {
	const fetchSong = () => {
		return {};
	}

	const fetchSongInfo = async(id, setter) => {
		useEffect(() => {
			setter({
				title: "Elysium (Part 1)",
				artist: "We are All Astronauts",
				coverPath: "/defaults/defaultCover1.jpg",
			})
		}, [])
	}

	return {fetchSong, fetchSongInfo};
})()

const musicPlayerView = (() => {
	let Controls = controls.render;
	let MusicMeter = musicMeter.render();
	let MusicMeterPin = musicMeterPin.render();

	const handleSongChange = () => {

	}

	const render = ({progressInterval, musicInfo}) => {
		console.log(musicInfo, musicInfo.get)
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
						/>
					</div>
					<div className="mPlayer__middle">
						<section className="mPlayer__currentPlay"
							onClick = {(e) => {console.log(e.currentTarget)}}
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
						<p> BJIR </p>
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
	let musicQueue = null;

	const changeSong = (direction) => {
		if(direction === "next") {
		} else {
		}
		alert("Changing song...")
		// Consult musicQueue
		
		/* get that song
		let nextSong = model.fetchSong();
		model.fetchSongInfo(1, setMusicInfo);
		*/
	}

	const watch = () => {
	}


	elemAudio.addEventListener("ended", () => {
		changeSong("next")
	})

	const render = () => {
		let [progressInterval, setProgressInterval] = useState(null);
		let [musicInfo, setMusicInfo] = useState(
			{
				title: "has",
				artist: "sal",
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
			}
		});
	}

	return {render}
})()


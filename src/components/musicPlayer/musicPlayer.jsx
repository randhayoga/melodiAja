import { useState } from "react";

import controls from "./controls.jsx";
import musicMeter from "./musicMeter.jsx";
import musicMeterPin from "./musicMeterPin.jsx";

import "./styles/musicPlayer.css";

const musicPlayerModel = (() => {
	let currentPlay = {
		title: "",
		artist: "",
		duration: 0,
	}

	const setMusic = (newMusic) => {
	}

	const getMusic = () => {
		return currentPlay;
	}

	return {getMusic};
})()

function musicPlayer() {
	let Controls = controls.render();
	let MusicMeter = musicMeter.render();
	let MusicMeterPin = musicMeterPin.render();

	let model = musicPlayerModel;

	let [progressInterval, setProgressInterval] = useState(null);
	let [musicPath, setMusicPath] = useState(model.getMusic())

	return (
		<>
			<section id="mPlayer">
				<Controls 
					interval={{
						get: progressInterval,
						set: setProgressInterval
					}}
					music={{
						get: musicPath,
						set: setMusicPath
					}} 
				/>
			</section>
			<MusicMeter />
			<MusicMeterPin />
		</>
	)
}

export default musicPlayer;

import { useState } from "react";

import controls from "./controls.jsx";
import musicMeter from "./musicMeter.jsx";
import musicMeterPin from "./musicMeterPin.jsx";

import "./styles/musicPlayer.css";

const musicPlayerModel = (() => {
	const fetchSong = () => {
		return {};
	}

	return {fetchSong};
})()

const musicPlayerView = (() => {
	let Controls = controls.render;
	let MusicMeter = musicMeter.render();
	let MusicMeterPin = musicMeterPin.render();

	const render = ({progressInterval, musicPath}) => {
		return (
			<>
				<section id="mPlayer">
					<Controls 
						interval={{
							get: progressInterval.get,
							set: progressInterval.set,
						}}
					/>
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

	const changeSong = () => {
	}

	const watch = () => {
	}

	const render = () => {
		let [progressInterval, setProgressInterval] = useState(null);
		let [musicPath, setMusicPath] = useState(model.fetchSong())

		return view.render({
			progressInterval: {
				get: progressInterval,
				set: setProgressInterval,
			},
			musicPath: {
				get: musicPath,
				set: setMusicPath,
			}
		});
	}

	return {render}
})()


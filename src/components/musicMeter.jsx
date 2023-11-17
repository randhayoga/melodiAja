import {useState} from 'react';
import MeterPin from "./musicMeterPin.jsx"
import MusicDuration from "./musicDuration.jsx"

import "./styles/musicMeter.css"

const musicMeterView = (() => {
	let meterWidth, setMeterWidth;

	let elemAudio = document.getElementById("audio");

	const getElem = () => {
		[meterWidth, setMeterWidth] = useState("0%");
		return (
			<div id="musicMeter__progress" style={
				{
					width: meterWidth
				}
			}> </div>
		)
	}

	const reset = () => {
		setMeterWidth("0%");
		MeterPin.update(0);
		MusicDuration.update();
	}

	const synchronize = () => {
		let position = (elemAudio.currentTime / elemAudio.duration)*100;
		let newPos = position.toFixed(2);
		setMeterWidth(`${newPos}%`);
		MeterPin.update(newPos);
		MusicDuration.update();
	}

	const handleClick = (elemProgress, clickPos) => {
		let actualPosition = clickPos - elemProgress.parent.getBoundingClientRect().left;
		actualPosition /= elemProgress.parent.getBoundingClientRect().width;
		actualPosition *= 100;

		elemAudio.currentTime = Math.round(elemAudio.duration*(actualPosition/100));
		synchronize();
	}

	return {synchronize, getElem, handleClick, reset};
})()

function MusicMeter() {
	let view = musicMeterView;
	let ProgressMeter = view.getElem;

	const seek = (event) => {
		let childNodes = event.currentTarget.childNodes;
		view.handleClick({
			parent: event.currentTarget,
			progress: childNodes[0],
			pin: MeterPin
			}, 
		event.clientX);
	}

	const render = () => {
		return (
			<div id="mPlayer__musicMeter" onClick={seek}>
				<ProgressMeter />
			</div>
		)
	}
	
	const update = () => {
		view.synchronize();
	}

	const reset = () => {
		view.reset();
	}

	return {render, update, reset}
}

let musicMeter = MusicMeter();
export default {
	render: () => musicMeter.render,
	update: musicMeter.update,
	reset: musicMeter.reset,
};

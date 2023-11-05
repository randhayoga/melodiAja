import {useState} from "react";

const musicDurationView = (() => {
	let currentDuration, setCurrentDuration;

	let elemAudio = document.getElementById("audio");

	const toMinutes = (seconds) => {
		let minutesString = String(
			(Math.floor(seconds / 60)).toFixed(0)
		).padStart(2, 0);
		let secondsString = String((seconds % 60).toFixed(0)).padStart(2, 0)
		return `${minutesString}:${secondsString}`
	}

	const render = () => {
		[currentDuration, setCurrentDuration] = useState(elemAudio.currentTime);

		return (
			<div className="mPlayer__position">
				<p> 
					{toMinutes(currentDuration)} / {toMinutes(elemAudio.duration)}
				</p>
			</div>
		)
	}

	const synchronize = () => {
		setCurrentDuration(elemAudio.currentTime);
	}

	return {render, synchronize};
})()

export default (() => {
	let view = musicDurationView;

	const render = () => {
		return view.render();
	}

	const update = () => {
		view.synchronize();
	}

	return {render, update};
})()

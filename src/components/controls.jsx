import "./styles/controls.css";

import MusicMeter from "./musicMeter.jsx"

function Controls() {
	let elemAudio = document.getElementById("audio");

	let musicQueue;
	let musicInfo;
	let musicMeter = MusicMeter;

	const buttonChangeMusic = (event) => {
		if(event.currentTarget.id == "controls__previous") {
			console.log("Previous music!")
		} else {
			console.log("Next music!")
		}
	}

	const buttonToggleMusic = (event, prevInterval, callback) => {
		if(elemAudio.paused) {
			elemAudio.play();
			callback(setInterval(musicMeter.update, 100));
		} else {
			elemAudio.pause();
			clearInterval(prevInterval);
			callback(null);
		}
		
		let buttonElems = event.currentTarget.childNodes;
		buttonElems[0].classList.toggle("icon--toggleOff");
		buttonElems[1].classList.toggle("icon--toggleOff");
	}

	const render = (props) => {
		return (
			<>
				<section id="mPlayer__controls">
					<div className="mPlayer__iconWrapper" id="controls__previous" onClick={buttonChangeMusic}>
						<img src="/icons/previous.png" alt="Previous Music" />
					</div>
					<div className="mPlayer__iconWrapper" id="controls__togglePlay" onClick={
						(event) => {
							buttonToggleMusic(event, props.interval.get, props.interval.set);
						}
					}>
						<img id="controls__play" src="/icons/play.png" alt="Play Music" />
						<img id="controls__pause" className="icon--toggleOff" src="/icons/pause.png" alt="Pause Music" />
					</div>
					<div className="mPlayer__iconWrapper" id="controls__next" onClick={buttonChangeMusic}>
						<img src="/icons/next.png" alt="Next Music" />
					</div>
				</section>
			</>
		)
	}

	return {render}
}

let controls = Controls();
export default {
	render: () => controls.render,
};

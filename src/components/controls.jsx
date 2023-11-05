import "./styles/controls.css";

import MusicMeter from "./musicMeter.jsx"
import MusicDuration from "./musicDuration.jsx"

const controlsView = (() => {
	const render = ({handlers, interval}) => {
		let {changeMusic, toggleMusic} = handlers;
		return (
			<>
				<section id="mPlayer__controls">
					<div className="mPlayer__iconWrapper" id="controls__previous" onClick={changeMusic}>
						<img src="/icons/previous.png" alt="Previous Music" />
					</div>
					<div className="mPlayer__iconWrapper" id="controls__togglePlay" onClick={
						(event) => {
							toggleMusic(event, interval.get, interval.set);
						}
					}>
						<img id="controls__play" src="/icons/play.png" alt="Play Music" />
						<img id="controls__pause" className="icon--toggleOff" src="/icons/pause.png" alt="Pause Music" />
					</div>
					<div className="mPlayer__iconWrapper" id="controls__next" onClick={changeMusic}>
						<img src="/icons/next.png" alt="Next Music" />
					</div>
				</section>
			</>
		)
	}

	return {render};
})()

export default (() => {
	let view = controlsView;
	let elemAudio = document.getElementById("audio");

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
			callback(setInterval(() => {
				MusicMeter.update();
				MusicDuration.update();
			}, 100));
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
		return view.render({
			handlers: {
				changeMusic: buttonChangeMusic,
				toggleMusic: buttonToggleMusic,
			},
			...props
		});
	}

	return {render}
})()

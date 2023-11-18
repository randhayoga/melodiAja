import "./styles/controls.css";

import MusicMeter from "./musicMeter.jsx"
import MusicDuration from "./musicDuration.jsx"

const controlsView = (() => {
	let elemAudio = document.getElementById("audio");

	const togglePlayButton = () => {
		document.getElementById("controls__play").classList.toggle("icon--toggleOff");
		document.getElementById("controls__pause").classList.toggle("icon--toggleOff");
	}

	const render = ({handlers, interval, musicQueue}) => {
		let {toggleMusic} = handlers;
		return (
			<>
				<section id="mPlayer__controls">
					<div className="mPlayer__iconWrapper" id="controls__previous" onClick={
						() => {
							if(elemAudio.paused) {
								toggleMusic(interval.get, interval.set);
								togglePlayButton();
							}
							musicQueue.previous()
						}
					}>
						<img src="/icons/previous.png" alt="Previous Music" />
					</div>
					<div className="mPlayer__iconWrapper" id="controls__togglePlay" onClick={
						() => {
							toggleMusic(interval.get, interval.set);
							togglePlayButton();
						}
					}>
						<img id="controls__play" 
							src="/icons/play.png" 
							alt="Play Music" 
						/>
						<img id="controls__pause" 
							className="icon--toggleOff" 
							src="/icons/pause.png" 
							alt="Pause Music" 
						/>
					</div>
					<div className="mPlayer__iconWrapper" id="controls__next" onClick={
						() => {
							if(elemAudio.paused) {
								toggleMusic(interval.get, interval.set);
								togglePlayButton();
							}
							musicQueue.next()
						}
					}>
						<img src="/icons/next.png" alt="Next Music" />
					</div>
				</section>
			</>
		)
	}

	return {render, togglePlayButton};
})()

export default (() => {
	let view = controlsView;
	let elemAudio = document.getElementById("audio");

	const buttonToggleMusic = (prevInterval, callback) => {
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
	}

	const togglePlayButton = () => view.togglePlayButton();
	const render = (props) => {
		return view.render({
			handlers: {
				toggleMusic: buttonToggleMusic,
			},
			...props
		});
	}

	return {render, togglePlayButton}
})()

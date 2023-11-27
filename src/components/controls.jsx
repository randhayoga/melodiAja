import "./styles/controls.css";

import MusicQueue from "./musicQueue.jsx"
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
						async() => {
							await musicQueue.previous()
							if(elemAudio.paused) {
								toggleMusic(interval.get, interval.set);
								togglePlayButton();
							}
						}
					}>
						<img src="/icons/previous.png" alt="Previous Music" />
					</div>
					<div className="mPlayer__iconWrapper" id="controls__togglePlay" onClick={
						async() => {
							const audioSet = elemAudio.getAttribute("src") != "";
							if(audioSet) {
								toggleMusic(interval.get, interval.set);
								togglePlayButton();
							} else {
								await musicQueue.next().finally(() => {
									const queueNotDone = MusicQueue.getCurrentMusic() != -1;
									if(queueNotDone) {
										toggleMusic(interval.get, interval.set);
										console.log("bjor")
										togglePlayButton();
									}
								})
							}
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
						async() => {
							await musicQueue.next()
							if(elemAudio.paused) {
								toggleMusic(interval.get, interval.set);
								togglePlayButton();
							}
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

	const togglePlayButton = () => view.togglePlayButton();

	const buttonToggleMusic = async(prevInterval, callback) => {
		if(elemAudio.paused) {
			await elemAudio.play().catch(() => {
				elemAudio.play();
				console.log("whatdehell")
			}).finally(() => {
				callback(setInterval(() => {
					MusicMeter.update();
					MusicDuration.update();
				}, 100));
			})
		} else {
			elemAudio.pause();
			clearInterval(prevInterval);
			callback(null);
		}
	}

	const render = (props) => {
		return view.render({
			handlers: {
				toggleMusic: buttonToggleMusic,
			},
			...props
		});
	}

	return {render, buttonToggleMusic, togglePlayButton}
})()

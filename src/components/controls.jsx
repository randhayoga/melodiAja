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
						async() => {
							await musicQueue.previous()
							const audioSet = elemAudio.getAttribute("src") != "";

							if(elemAudio.paused && audioSet) {
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
							if(audioSet) { togglePlayButton();
							} else { await musicQueue.next() // Upon first time playing
							}
							toggleMusic(interval.get, interval.set);
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
							const audioSet = elemAudio.getAttribute("src") != "";

							if(elemAudio.paused && audioSet) {
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
		const audioElemReady = elemAudio.paused && elemAudio.getAttribute("src") != ""
		if(audioElemReady) {
			elemAudio.play().catch(() => {
				elemAudio.play();
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

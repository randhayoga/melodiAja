import { useState, useEffect } from "react";
import MusicPlayer from "./musicPlayer.jsx"
import contentList from "./contentList.jsx"
import "./styles/musicQueue.css"

const musicQueueView = (() => {
	const toggle = () => {
		let elem = document.getElementsByClassName("musicQueue")[0];
		elem.classList.toggle("musicQueue--showing")
	}

	const render = ({musicList}) => {
		let ContentList = contentList().render;
		return (
			<section className="musicQueue">
				<div className="musicQueue__top">
					<h3 className="musicQueue__name">Music queue</h3>
					<div className="musicQueue__buttons"> 
						<button
							onClick={() => {
								musicList.clear();
							}}
						> Clear </button>
						<img src="/icons/close_x.png" alt="close" 
							className="icon icon--small"
							onClick={toggle}
						/>
					</div>
				</div>
				{
					(musicList.get != undefined? (
						<>
							<ContentList 
								itemList={musicList.get}
								id="musicQueue__musicList"
								className="musicQueue__content"
							/>
						</>
					):
						<></>
					)
				}
			</section>
		)
	}

	const sync = (end) => {
		// Not efficient, but convenient
		document.getElementById("musicQueue__musicList").childNodes.forEach(
			(elem, key) => {
				elem.classList.remove("musicQueue__item--dimmed")
				if(key < end) {
					elem.classList.add("musicQueue__item--dimmed")
				}
			}
		)
	}

	return {render, toggle, sync};

})()

export default (() => {
	let view = musicQueueView;
	let currentPlayIdx = -1;
	let refQueue, refSetQueue;

	const enqueue = ({id, title, artist, imgPath}) => {
		refSetQueue([...refQueue, {
				type: "queueMusic",
				id: id,
				title: title,
				artist: artist,
				imgPath: imgPath,
		}])
	}

	const next = () => {
		if(currentPlayIdx == -1) {
			currentPlayIdx = 0
		} else if(currentPlayIdx < refQueue.length){
			currentPlayIdx++
		}
		view.sync(currentPlayIdx);
	}

	const previous = () => {
		if(currentPlayIdx == refQueue.length) {
			currentPlayIdx = refQueue.length - 2
		} else if(currentPlayIdx > 0){
			currentPlayIdx--
		}
		view.sync(currentPlayIdx);
	}

	const replay = () => {
		currentPlayIdx = -1;
		view.sync(currentPlayIdx);
	}

	const getCurrentMusic = () => {
		if( currentPlayIdx > -1 
			&& currentPlayIdx < refQueue.length
		) {
			return refQueue[currentPlayIdx].id;
		}
		return -1;
	} 

	const toggle = () => {
		view.toggle();
	}

	const render = () => {
		const [queue, setQueue] = useState([]);
		refQueue = queue;
		refSetQueue = setQueue;

		const clear = () => {
			replay();
			setQueue([]);
		}

		return view.render({
			musicList: {
				get: queue,
				clear: clear,
			}
		});
	}


	return {render, toggle, next, previous, enqueue, getCurrentMusic, replay}
})()

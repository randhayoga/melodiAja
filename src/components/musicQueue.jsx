import { useState, useEffect } from "react";
import contentList from "./contentList.jsx"
import "./styles/musicQueue.css"

const musicQueueView = (() => {
	const playlistIcon = document.getElementById("musicPlaylistButton");

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

	const shakePlaylist = () => {
		if(!musicPlaylistButton.classList.contains("anim--shake")) {
			musicPlaylistButton.classList.toggle("anim--shake")
			setTimeout(() => {
				musicPlaylistButton.classList.toggle("anim--shake")
			}, 666);
		}
	}

	return {render, toggle, sync, shakePlaylist};

})()

export default (() => {
	let view = musicQueueView;
	let currentPlayIdx = -1;
	let refQueue, refSetQueue;

	const sync = () => view.sync(currentPlayIdx);
	const toggle = () => view.toggle();
	const replay = () => currentPlayIdx = -1;

	const enqueue = ({id, title, artist, imgPath}) => {
		// Adjust pointer when music added to queue and pointer has surpassed previous queue
		if(currentPlayIdx == refQueue.length) {
			currentPlayIdx--;
		}

		view.shakePlaylist();
		refSetQueue([...refQueue, {
				type: "queueMusic",
				id: id,
				title: title,
				artist: artist,
				imgPath: imgPath,
		}])
	}

	const next = () => {
		const queueNotEmpty = refQueue.length > 0
		if(currentPlayIdx == -1 && queueNotEmpty) {
			currentPlayIdx = 0
		} else if(currentPlayIdx < refQueue.length && queueNotEmpty){
			currentPlayIdx++
		}
	}

	const previous = () => {
		if(currentPlayIdx == refQueue.length) {
			currentPlayIdx = refQueue.length - 2
		} else if(currentPlayIdx > 0){
			currentPlayIdx--
		}
	}


	const getCurrentMusic = () => {
		if( currentPlayIdx > -1 
			&& currentPlayIdx < refQueue.length
		) {
			return refQueue[currentPlayIdx].id;
		}
		return -1;
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


	return {render, toggle, next, previous, enqueue, getCurrentMusic, replay, sync}
})()

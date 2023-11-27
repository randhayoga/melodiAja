import musicQueue from "./musicQueue.jsx"
import contentList from "./contentList.jsx"
import searchBar from "./searchBar.jsx"
import uploadMusicForm from "./uploadMusicForm.jsx"
import "./styles/myMusicPage.css"
import { useEffect, useState } from "react";

const myMusicPageModel = (() => {
	const fetchMusic = async(setter) => {
		useEffect(() => {
			fetch("/info/musicList")
				.then((response) => {
					if(response.ok) {
						return response.json();
					}
					throw new Error("Failed to establish connection")
				}).then((response) => {
					setter(response.musicList);
					return 0;
				}).catch((err) => {
					console.log(err.message);
					return -1;
				})
		}, [])
	}

	return {fetchMusic}
})()

const myMusicPageView = (() => {
	let ContentList = contentList().render;
	let SearchBar = searchBar().render;

	const render = (items) => {
		return (
			<section id="myMusicPage">
				<div className="myMusicPage__section">
					<SearchBar />
				</div>
				<div className="myMusicPage__section">
					<div className="myMusicPage__header">
						<h2 className="section__heading">My Musics</h2>
						<div className="myMusicPage__headerUtils">
							<button 
								id="myMusicPage__addMusic"
								onClick = {() => {
									uploadMusicForm.toggle();
								}}
							> 
								<img 
									className="icon icon--small" 
									src="/icons/plus.png" 
									alt="" 
								/>
								<p> Upload music </p>
							</button>
						</div>
					</div>
					<ContentList 
						itemList={items} 
						handlers = {{
							selectMusic: (item) => {
								musicQueue.enqueue(item); 
							}
						}}
					/>
				</div>
			</section>
		)
	}

	return {render};
})()

let myMusicPage = (function() {
	let view = myMusicPageView;
	let model = myMusicPageModel;

	const render = () => {
		const [musicList, setMusicList] = useState([]);
		model.fetchMusic(setMusicList);
		return view.render(musicList);
	}

	return {render};
})()

export default {
	render: myMusicPage.render,
}

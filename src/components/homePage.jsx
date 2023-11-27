import MusicQueue from "./musicQueue.jsx"
import MusicPlayer from "./musicPlayer.jsx"
import contentList from "./contentList.jsx";
import contentTiled from "./contentTiled.jsx";
import "./styles/homePage.css"
import { useEffect, useState } from "react";

const homePageModel = (() => {
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

const homePageView = (() => {
	const BEST_PICKS = {
		id: "homePage__bestPicks",
		content: [
			{
				imgPath: "/img/chillStudyMusic.png",
				heading: "Study Beats",
				subheading: "Chill",
			},
			{
				imgPath: "/img/jazzyRainyMorning.png",
				heading: "Morning",
				subheading: "Jazzy",
			},
			{
				imgPath: "/img/alternativeRock.png",
				heading: "Rock",
				subheading: "Alternative",
			},
			{
				imgPath: "/img/traditionalFolkMusic.png",
				heading: "Folk Music",
				subheading: "Traditional",
			},
		]
	}
	const FOR_YOU = {
		id: "homePage__forYou",
		content: [
			{
				imgPath: "/img/newYear2023.png",
				heading: "2023",
				subheading: "New Year",
			},
			{
				imgPath: "/img/bestOfPopMusic.png",
				heading: "Pop Music",
				subheading: "Best Of",
			},
			{
				imgPath: "/img/fridayNight.png",
				heading: "Night",
				subheading: "Friday",
			},
		]
	}

	const render = (musicList) => {
		let ContentList = contentList().render;
		let ContentTiled = contentTiled().render;

		return (
			<section id="homePage">
				<section className="homePage__section">
					<h2 className="section__heading">Best Picks</h2>
					<ContentTiled itemList={BEST_PICKS.content} id={BEST_PICKS.id} nRows={4} />
				</section>
				<section className="homePage__section">
					<h2 className="section__heading">For You</h2>
					<ContentTiled itemList={FOR_YOU.content} id={FOR_YOU.id} nRows={3} />
				</section>
				<section className="homePage__section">
					<h2 className="section__heading">Popular</h2>
					<div className="section__content section__content--list">
						{
							musicList.length != 0? (
								<ContentList itemList={musicList} 
									handlers={{
										selectMusic: (item) => {
											MusicQueue.enqueue(item)
										},
										playNow: (item) => {
											MusicPlayer.changeMusicImmediately(item)
										}
									}}
								/>
							): <p> Fetching info... </p>
						}
					</div>
				</section>
			</section>
		)
	}

	return {render} 
})()

export default (() => {
	let model = homePageModel;
	let view = homePageView;


	const render = () => {
		const [musicList, setMusicList] = useState([]);

		model.fetchMusic(setMusicList);
		return view.render(musicList);
	}

	return {render}
})()

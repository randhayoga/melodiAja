import MusicQueue from "./musicQueue.jsx"
import contentList from "./contentList.jsx";
import contentTiled from "./contentTiled.jsx";
import "./styles/homePage.css"
import {useState} from 'react';

const homePageModel = (() => {
	const getMusicInfo__EX = () => {
		return [
			{
				type: "music",
				id: "blal",
				title: "Music1",
				artist: "Artist1",
				imgPath: "/defaults/defaultCover0.jpg",
			},
			{
				type: "music",
				id: "blal2",
				title: "Music2",
				artist: "Artist2",
				imgPath: "/defaults/defaultCover2.jpg",
			},
			{
				type: "music",
				id: "blal3",
				title: "Music3",
				artist: "Artist3",
				imgPath: "/defaults/defaultCover1.jpg",
			}
		]
	}

	return {getMusicInfo__EX}
})()

function HomePage() {
	let model = homePageModel;
	let ContentList = contentList().render;
	let ContentTiled = contentTiled().render;

	const [musicList, setMusicList] = useState(model.getMusicInfo__EX());
	const BEST_PICKS = {
		id: "homePage__bestPicks",
		content: [
			{
				imgPath: "/defaults/defaultCover1.jpg",
				heading: "Study Beats",
				subheading: "Chill",
			},
			{
				imgPath: "/defaults/defaultCover1.jpg",
				heading: "Morning",
				subheading: "Jazzy",
			},
			{
				imgPath: "/defaults/defaultCover1.jpg",
				heading: "Rock",
				subheading: "Alternative",
			},
			{
				imgPath: "/defaults/defaultCover1.jpg",
				heading: "Folk Music",
				subheading: "Traditional",
			},
		]
	}
	const FOR_YOU = {
		id: "homePage__forYou",
		content: [
			{
				imgPath: "/defaults/defaultCover1.jpg",
				heading: "2023",
				subheading: "New Year",
			},
			{
				imgPath: "/defaults/defaultCover1.jpg",
				heading: "Pop Music",
				subheading: "Best Of",
			},
			{
				imgPath: "/defaults/defaultCover1.jpg",
				heading: "Serenity",
				subheading: "Tranquil",
			},
		]
	}

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
					<ContentList itemList={musicList} 
						handlers={{
							selectMusic: (item) => {
								MusicQueue.enqueue(item)
							},
						}}
					/> 
				</div>
			</section>
		</section>
	)
}

export default HomePage;

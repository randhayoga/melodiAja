import MusicQueue from "./musicQueue.jsx"
import MusicPlayer from "./musicPlayer.jsx"
import contentList from "./contentList.jsx";
import contentTiled from "./contentTiled.jsx";
import "./styles/homePage.css"

const homePageModel = (() => {
	const fetchMusic = () => {
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

	return {fetchMusic}
})()

const homePageView = (() => {
	const render = ({BEST_PICKS, FOR_YOU, musicList}) => {
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
					</div>
				</section>
			</section>
		)
	}

	return {render} })()

export default (() => {
	let model = homePageModel;
	let view = homePageView;

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

	const render = () => {
		return view.render({
			BEST_PICKS: BEST_PICKS,
			FOR_YOU: FOR_YOU,
			musicList: model.fetchMusic()
		});
	}

	return {render}
})()

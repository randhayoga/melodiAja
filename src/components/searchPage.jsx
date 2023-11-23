import musicQueue from "./musicQueue.jsx"
import contentList from "./contentList.jsx";
import contentTiled from "./contentTiled.jsx";
import searchBar from "./searchBar.jsx";

import "./styles/searchPage.css"

const searchPageModel = (() => {
	const getRecentSearch = () => {
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

	return {getRecentSearch};
})()

const searchPageView = (() => {
	let ContentList = contentList().render;
	let ContentTiled = contentTiled().render;
	let SearchBar = searchBar().render;

	const GENRES = [
		{ imgPath: "/img/jazzyRainyMorning.png",
			heading: "Jazz",
		},
		{ imgPath: "/img/popMusic.png",
			heading: "Pop Music",
		},
		{ imgPath: "/img/houseMusic.png",
			heading: "House Music",
		},
		{ imgPath: "/img/rockMusic.png",
			heading: "Rock Music",
		},
		{ imgPath: "/img/chillMix.png",
			heading: "Chill Mix",
		},
		{ imgPath: "/img/classicalMusic.png",
			heading: "Classical Music",
		},
		{ imgPath: "/img/punkMusic.png",
			heading: "Punk Music",
		},
		{ imgPath: "/img/romanticMusic.png",
			heading: "Romantic Music",
		},
	]

	function render(recentSearch) {
		return (
			<section id="searchPage">
				<section className="searchPage__section">
					<SearchBar />
				</section>
				<section className="searchPage__section">
					<h2 className="section__heading">Recent Search</h2>
					<ContentList 
						itemList={recentSearch} 
						handlers={{
							selectMusic: (item) => musicQueue.enqueue(item),
						}}
					/>
				</section>
				<section className="searchPage__section">
					<h2 className="section__heading">Find by Genre</h2>
					<ContentTiled itemList={GENRES} id="searchPage__byGenre" nRows={4}/>
				</section>
			</section>
		);
	}

	return {render};
})()

export default (() => {
	let model = searchPageModel;
	let view = searchPageView;

	const render = () => {
		return view.render(model.getRecentSearch());
	}

	return {render};
})()

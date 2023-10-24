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
				coverPath: "/defaults/defaultCover0.jpg",
			},
			{
				type: "music",
				id: "blal2",
				title: "Music2",
				artist: "Artist2",
				coverPath: "/defaults/defaultCover2.jpg",
			},
			{
				type: "music",
				id: "blal3",
				title: "Music3",
				artist: "Artist3",
				coverPath: "/defaults/defaultCover1.jpg",
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
		{ bgPath: "/defaults/defaultCover1.jpg",
			heading: "Jazz",
		},
		{ bgPath: "/defaults/defaultCover1.jpg",
			heading: "Pop Music",
		},
		{ bgPath: "/defaults/defaultCover1.jpg",
			heading: "House Music",
		},
		{ bgPath: "/defaults/defaultCover1.jpg",
			heading: "Rock Music",
		},
		{ bgPath: "/defaults/defaultCover1.jpg",
			heading: "Chill Mix",
		},
		{ bgPath: "/defaults/defaultCover1.jpg",
			heading: "Classical Music",
		},
		{ bgPath: "/defaults/defaultCover1.jpg",
			heading: "Punk Music",
		},
		{ bgPath: "/defaults/defaultCover1.jpg",
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
					<ContentList itemList={recentSearch} />
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

function SearchPage() {
	let model = searchPageModel;
	let view = searchPageView;

	const render = () => {
		return view.render(model.getRecentSearch());
	}

	return {render};
}

let searchPage = SearchPage();
export default {
	render: searchPage.render,
};

import contentList from "./contentList.jsx"
import searchBar from "./searchBar.jsx"
import "./styles/myPlaylistPage.css"

const myPlaylistPageModel = (() => {
	const fetchItems = () => {
		return [
			{
				type: "playlist",
				name: "Study Music",
				nSongs: 20,
				nViews: 2000,
				visibility: "Public",
				imgPath: "/defaults/defaultCover0.jpg",
			},
			{
				type: "playlist",
				name: "Romantic Music",
				nSongs: 6,
				nViews: 9420,
				visibility: "Private",
				imgPath: "/defaults/defaultCover1.jpg",
			},
			{
				type: "playlist",
				name: "Friday Night",
				nSongs: 10,
				nViews: 2000,
				visibility: "Public",
				imgPath: "/defaults/defaultCover2.jpg",
			},
		]
	}

	return {fetchItems}
})()

const myPlaylistPageView = (() => {
	let ContentList = contentList().render;
	let SearchBar = searchBar().render;

	const render = (items) => {
		return (
			<section id="myPlaylistPage">
				<div className="myPlaylistPage__section">
					<SearchBar />
				</div>
				<div className="myPlaylistPage__section">
					<h2 className="section__heading">My Playlist</h2>
					<ContentList itemList={items} />
				</div>
			</section>
		)
	}

	return {render};
})()

let myPlaylistPage = (function() {
	let view = myPlaylistPageView;
	let model = myPlaylistPageModel;

	const render = () => {
		return view.render(model.fetchItems());
	}

	return {render};
})()

export default {
	render: myPlaylistPage.render,
}

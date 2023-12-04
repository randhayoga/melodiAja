import { useState } from "react"
import contentList from "./contentList.jsx"
import makePlaylistForm from "./makePlaylistForm.jsx"
import searchBar from "./searchBar.jsx"
import "./styles/myPlaylistPage.css"

const myPlaylistPageModel = (() => {
	const fetchPlaylist = async(setter) => {
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
	let SearchBar = searchBar("myPlaylist", "playlist").render;

	const render = (itemList, setItemList) => {
		return (
			<section id="myPlaylistPage">
				<div className="myPlaylistPage__section">
					<SearchBar handlers={(newItemList) => {
						setItemList(newItemList);
					}}/>
				</div>
				<div className="myPlaylistPage__section">
					<div className="myPlaylistPage__header">
						<h2 className="section__heading">My Playlist</h2>
						<div className="myPlaylistPage__headerUtils">
							<button 
								id="myPlaylistPage__addPlaylist"
								onClick = {() => {
									makePlaylistForm.toggle();
								}}
							> 
								<img 
									className="icon icon--small" 
									src="/icons/plus.png" 
									alt="" 
								/>
								<p> Create Playlist </p>
							</button>

						</div>
					</div>
					<ContentList itemList={itemList} />
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
		const [playlistList, setPlaylistList] = useState(model.fetchItems());
		return view.render(playlistList, setPlaylistList);
	}

	return {render};
})()

export default {
	render: myPlaylistPage.render,
}

import {useState, useEffect} from 'react'
import MusicQueue from "./musicQueue.jsx"
import Loading from "./loadScreen.jsx"
import contentList from "./contentList.jsx";
import contentTiled from "./contentTiled.jsx";
import searchBar from "./searchBar.jsx";

import "./styles/searchPage.css"

const searchPageModel = (() => {
	const fetchSearchResult = async(setter) => {
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

	return {fetchSearchResult}
})()

const searchPageView = (() => {
	let ContentList = contentList().render;
	let ContentTiled = contentTiled().render;
	let SearchBar = searchBar("search").render;

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

	function render(itemList, setItemList) {
		const [searchDone, setSearchDone] = useState(false);
		return (
			<section id="searchPage">
				<section className="searchPage__section">
					<SearchBar handlers={(newItemList) => {
						// Only refreshes once upon searching
						if(!searchDone) { setSearchDone(true); }
						setItemList(newItemList);
					}}/>
				</section>
				<section className="searchPage__section">
					<h2 className="section__heading"> {
						!searchDone? "Recent Search": "Search Result"
					}</h2>
					{
						itemList.length != 0? (
							<ContentList itemList={itemList} 
								handlers={{
									selectMusic: (item) => {
										MusicQueue.enqueue(item)
									},
									playNow: (item) => {
										MusicPlayer.changeMusicImmediately(item)
									}
								}}
							/>
						): <Loading />
					}
				</section>
				{
					!searchDone? (
						<section className="searchPage__section">
							<h2 className="section__heading">Find by Genre</h2>
							<ContentTiled itemList={GENRES} id="searchPage__byGenre" nRows={4}/>
						</section>
					):<></>
				}
			</section>
		);
	}

	return {render};
})()

export default (() => {
	let model = searchPageModel;
	let view = searchPageView;

	const render = () => {
		const [musicList, setMusicList] = useState([]);

		// model.fetchSearchResult(setMusicList);
		return view.render(musicList, setMusicList);
	}

	return {render};
})()

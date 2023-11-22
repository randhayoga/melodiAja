import musicQueue from "./musicQueue.jsx"
import contentList from "./contentList.jsx"
import searchBar from "./searchBar.jsx"
import uploadMusicForm from "./uploadMusicForm.jsx"
import "./styles/myMusicPage.css"

const myMusicPageModel = (() => {
	const fetchItems = () => {
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

	return {fetchItems}
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
		return view.render(model.fetchItems());
	}

	return {render};
})()

export default {
	render: myMusicPage.render,
}

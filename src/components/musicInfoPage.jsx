import {useState, useEffect} from 'react';
import "./styles/musicInfoPage.css"
import stats from "./stats.jsx"
import comments from './comments.jsx';

const musicInfoModel = (() => {
	const fetchMusicInfo = async(id, setter) => {
		useEffect(() => {
			setter()
		}, [])
	}

	const fetchComments = () => {
		return {
			type: "comment",
			id: "blal",
			title: "Music1",
			artist: "Artist1",
			coverPath: "/defaults/defaultCover0.jpg",
		}
	}

})()

const musicInfoView = (() => {
	let ArtistStats = stats().render;
	let MusicStats = stats().render;
	let Comments = comments.render;

	const toggle = () => {
		document.getElementById("musicInfoPage")
			.classList.toggle("musicInfoPage--hidden");
	}

	const render = () => {
		return (
			<section id="musicInfoPage" className="musicInfoPage musicInfoPage--hidden" onClick= {(e) => {
				toggle()
				e.stopPropagation();
			}}
			>
				<div className="musicInfoPage__wrapper">
					<div className="musicInfoPage__background">
						<img src="/defaults/defaultCover1.jpg" alt="" />
					</div>
					<div className="musicInfoPage__content">
						<div className="musicInfoPage__musicInfo">
							<div className="musicInfo__wrapper">
								<img className="musicInfo__musicImg" 
									src="/defaults/defaultCover1.jpg" 
								alt="" />
								<div className="musicInfo__info">
									<p className="musicInfo__songTitle"> And Thus, We Cast Asunder </p>
									<p className="musicInfo__albumName"> (No Album) </p>
								</div>
								<MusicStats opts= {
										{
											"border": false,
										}
									} 
									statsItems={
									{
										"Play": ["/icons/play.png", 1000000], 
										"Like": ["/icons/filledLike.png", 111221], 
										"Dislike": ["/icons/filledDislike.png", 100], 
										"Comments": ["/icons/comment.png", 3421], 
									}
								}/>
								<div className="musicInfo__artist">
									<img className="musicInfo__artistImg" src="" alt="" />
									<div className="musicInfo__artistInfo">
										<p className="musicInfo__artistName"> 
											Eliran Ben Ishai
										</p>
										<ArtistStats opts= {
												{
													"border": true,
												}
											} 
											statsItems={
											{
												"Followers": 121221, 
												"Musics": 324131, 
											}
										}/>
									</div>
								</div>
							</div>
						</div>
						<div className="musicInfo__comments">
							<h3> Comments </h3>
							<Comments id={1} />
						</div>
					</div>
				</div>
			</section>
		)
	}

	return {render, toggle}
})()

export default (() => {
	let model = musicInfoModel;
	let view = musicInfoView;

	const render = () => {
		const [musicInfo, setMusicInfo] = useState(
			{

		})
		return view.render();
	}

	const update = (musicInfo) => {
	}

	const toggle = () => {
		view.toggle();
	}
	return {render, update, toggle}
})()

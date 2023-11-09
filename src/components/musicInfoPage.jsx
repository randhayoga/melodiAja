import {useState, useEffect} from 'react';
import Stats from "./stats.jsx"
import "./styles/musicInfoPage.css"
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
							<img className="musicInfoPage__musicCover" 
								src="/defaults/defaultCover1.jpg" 
							alt="" />
							<div className="musicInfoPage__info">
								<div>
									<p className="musicInfoPage__songTitle"> Elysium (Part I)</p>
									<p className="musicInfoPage__albumName"> - </p>
								</div>
							</div>
							<div className="musicInfoPage__stats">
								<div className="musicInfoPage__statsItem">
									<img src="/icons/filledLike.png" 
										className="icon icon--small" alt="Like" />
									<p> 100 </p>
								</div>
								<div className="musicInfoPage__statsItem">
									<img src="/icons/filledDislike.png" 
										className="icon icon--small" alt="Dislike" />
									<p> 100 </p>
								</div>
								<div className="musicInfoPage__statsItem">
									<img src="/icons/comment.png" 
										className="icon icon--small" alt="Comments" />
									<p> 100 </p>
								</div>
							</div>
							<div className="musicInfoPage__artist">
								<img className="musicInfoPage__artistCover" src="" alt="" />
								<div className="musicInfoPage__artistInfo">
								</div>
							</div>
						</div>
						<div className="musicInfoPage__comments">
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

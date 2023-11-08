import {useState, useEffect} from 'react';
import Stats from "./stats.jsx"
import "./styles/musicInfoPage.css"

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
							<h3>bjir</h3>
							<p>
							Sit obcaecati dignissimos illo alias itaque accusamus. Unde adipisci quia impedit sint laborum veritatis temporibus eligendi eveniet labore? Quam quo nemo adipisci provident velit Magni iure cum non aut expedita? Similique ipsum laborum debitis pariatur asperiores nulla. Minima voluptatum sapiente ipsum nobis excepturi. Officia quaerat quas placeat veritatis laborum illo. Voluptatibus quaerat illo necessitatibus repellendus totam Aspernatur odit voluptatem quia consequuntur amet sequi animi magni dolorem Voluptate in laboriosam perferendis incidunt excepturi! Cupiditate dolor sed recusandae quibusdam ad? Quo natus iure obcaecati eligendi laborum Deserunt quia dolores quod iste placeat autem? Rem expedita voluptates soluta officiis mollitia Dicta voluptatum quos in ipsa mollitia? Eius laudantium harum numquam accusamus et? Dolore a iste et dignissimos inventore. Voluptatum temporibus aperiam quod quibusdam.
							</p>
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

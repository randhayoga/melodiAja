import {useState, useEffect} from 'react';
import "./styles/musicInfoPage.css"
import stats from "./stats.jsx"
import comments from "./comments.jsx";

const musicInfoModel = (() => {
	const fetchMusicArtist = async(musicID, setter, getter) => {
		useEffect(() => {
			if(musicID != -1) {
				fetch(`/info/musicArtist/${musicID}`)
					.then((response) => {
						if(response.ok) {
							return response.json();
						}
						throw new Error;
					}).then(response => {
						setter({
							name: response.artistName,
							imgPath: response.imgPath,
							nFollower: response.nFollower,
							nMusic: response.nMusic,
						})
					}).catch((err) => {
						console.log(err)
						setter({
							...getter,
							name: "ArtistFetchingError",
						})
					})
			}
		}, [musicID])
	}

	const fetchMusicInfo = async(id, setter, getter) => {
		useEffect(() => {
			if(id != -1) {
				fetch(`/info/musicInfo/${id}`)
					.then((response) => {
						if(response.ok) {
							return response.json();
						}
						throw new Error;
					}).then(response => {
						setter({
							...response
						})
					}).catch((err) => {
						console.log(err)
						setter({
							...getter,
							name: "MusicInfoFetchingError",
						})
					})
				return
			}
		}, [id])
	}
	
	return {fetchMusicArtist, fetchMusicInfo}
})()

const musicInfoView = (() => {
	let ArtistStats = stats().render;
	let MusicStats = stats().render;
	let Comments = comments.render;

	const toggle = () => {
		document.getElementById("musicInfoButton").classList.toggle("rotate--180")
		document.getElementById("musicInfoPage")
			.classList.toggle("musicInfoPage--hidden");
	}

	const render = (currentMusicID, musicInfo, artistInfo) => {
		const {title, nPlay, nLike, nDislike, nComment} = musicInfo;
		const {name, nFollower, nMusic} = artistInfo;
		return (
			<section id="musicInfoPage" className="musicInfoPage musicInfoPage--hidden">
				<div className="musicInfoPage__wrapper">
					<div className="musicInfoPage__background">
						<img src={musicInfo.imgPath} alt="" />
					</div>
					<div className="musicInfoPage__content">
						<div className="musicInfoPage__musicInfo">
							<div className="musicInfo__wrapper">
								<img className="musicInfo__musicImg" 
									src={musicInfo.imgPath} 
								alt="" />
								<div className="musicInfo__info">
									<p className="musicInfo__songTitle"> {title} </p>
									<p className="musicInfo__albumName"> (No Album) </p>
								</div>
								<MusicStats opts= {
										{
											"border": false,
										}
									} 
									statsItems={
									{
										"Play": ["/icons/play.png", nPlay], 
										"Like": ["/icons/filledLike.png", nLike], 
										"Dislike": ["/icons/filledDislike.png", nDislike], 
										"Comments": ["/icons/comment.png", nComment], 
									}
								}/>
								<div className="musicInfo__artist">
									<img className="musicInfo__artistImg" src={artistInfo.imgPath} alt="" />
									<div className="musicInfo__artistInfo">
										<p className="musicInfo__artistName"> {name} </p>
										<ArtistStats opts= {
												{
													"border": true,
												}
											} 
											statsItems={
											{
												"Followers": nFollower, 
												"Musics": nMusic, 
											}
										}/>
									</div>
								</div>
							</div>
						</div>
						<div className="musicInfo__comments">
							<h3> Comments </h3>
							<Comments id={currentMusicID} />
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

	const render = ({currentMusic}) => {
		const [musicInfo, setMusicInfo] = useState({
			title: "No music being played",
			imgPath: "",
			nPlay: 0,
			nLike: 0,
			nDislike: 0,
			nComment: 0,
		})
		
		const [artistInfo, setArtistInfo] = useState({
			name: "...",
			imgPath: "",
			nFollower: 0,
			nMusic: 0,
		})

		model.fetchMusicInfo(currentMusic, setMusicInfo, musicInfo)
		model.fetchMusicArtist(currentMusic, setArtistInfo, artistInfo)
		return view.render(currentMusic, musicInfo, artistInfo);
	}

	const toggle = () => {
		view.toggle();
	}

	return {render, toggle}
})()

import {useState} from 'react';
import stats from "./stats.jsx";
import "./styles/userPage.css"

const userPageModel = (() => {
	const getMusicInfo__EX = () => {
		return {
			name: "Heidi Bournevilla",
			username: "heidinOne",
			pfpPath: "/defaults/defaultFemale.jpg",
			nFollowers: 200,
			nMusics: 10,
			nCollections: 5000, // Album + playlist
		}
		
	}

	return {fetchInfo: getMusicInfo__EX} 
})()

const userPageView = (() => {
	let Stats = stats().render;

	function render({name, username, pfpPath, nFollowers, nMusics, nCollections}) {
		return (
			<section id="userPage">
				<section id="userPage__top">
					<div className="userPage__imgWrapper" >
						<img src={pfpPath} alt={`${username}'s picture`} />
					</div>
					<div id="userPage__profileSect">
						<div id="profileSect__profile">
							<div className="profile__names">
								<p className="profile__name"> {name} </p>
								<p className="profile__username"> {`@${username}`} </p>
							</div>
							<div className="userPage__imgWrapper">
								<img src="/icons/music.png" alt="Settings Icon" />
							</div>
						</div>
						<Stats type="user" statsItems={
							{nFollowers: nFollowers, nMusics: nMusics, nCollections:nCollections}
						} />
						<section id="profileSect__actions">
							<button type="button" id="button--follow" className="hover--bright"> Follow </button>
							<button type="button" id="button--share" className="hover--bright"> Share </button>
						</section>
					</div>
				</section>
			</section>
		)
	}

	return {render}
})()

function UserPage() {
	let model = userPageModel;
	let view = userPageView;

	const render = () => {
		const [currentUser, setCurrentUser] = useState(model.fetchInfo());
		return view.render(currentUser);
	}

	return {render};
}

let userPage = UserPage();
export default {
	render: userPage.render,
};

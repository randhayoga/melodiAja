import "./styles/profile.css"
import {Link} from "react-router-dom";

const profileModel = (() => {
	const getData = () => {
		return {
			name: "Heidi",
			imgPath: "#",
		}
	}

	return {getData};
})()


const profileView = (() => {
	const render = (name, imgPath) => {
		return (
			<Link to="/user/me">
				<div id="topbar__profile">
						<div className="imgWrapper">
							<img 
								id="currentUser__PFP"
								src="/defaults/defaultFemale.jpg" 
								alt={`${name}'s PFP`}
							/>
						</div>
				</div>
			</Link>
		)
	}

	return {render};
})()

const Profile = (props) => {
	let model = profileModel;
	let view = profileView;
	
	let userDetails = model.getData();

	const render = (props) => {
		return view.render(
			userDetails.name, 
			userDetails.imgPath
		);
	}
	
	return {render}
}

let profile = Profile();
export default {
	render: profile.render,
};

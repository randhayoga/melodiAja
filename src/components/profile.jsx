import "./styles/profile.css"
import {Link} from "react-router-dom";

const profileModel = (() => {
	const getData = () => {
		return {
			name: "Heidi",
			filePath: "#",
		}
	}

	return {getData};
})()


const profileView = (() => {
	const render = (name, pfpPath) => {
		return (
			<Link to="/user/me">
				<div id="topbar__profile">
						<div className="imgWrapper">
							<img src="/defaults/defaultFemale.jpg" alt={`${name}'s PFP`}/>
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
			userDetails.filePath
		);
	}
	
	return {render}
}

let profile = Profile();
export default {
	render: profile.render,
};

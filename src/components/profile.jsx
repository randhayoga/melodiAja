import "./styles/profile.css"

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
			<div id="topbar__profile">
				<div className="imgWrapper">
					<img src="/defaults/defaultFemale.jpg" alt={`${name}'s PFP`}/>
				</div>
			</div>
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

import "./styles/greeter.css"

const greeterModel = (() => {
	const getData = (userID) => {
		return {
			name: "Heidi Bournevilla"
		}
	}

	return {getData};
})()


const greeterView = (() => {
	const render = (name, period) => {
		return (
			<div id="topbar__greeter">
				<p> Good {period}, </p>
				<p id="greeter__recipient"> {name}! </p>
			</div>
		)
	}

	return {render};
})()

function Greeter(props) {
	let model = greeterModel;
	let view = greeterView;
	
	let userDetails = model.getData(props.userID);

	const getTimePeriod = () => {
		let date = new Date();
		let currentHour = date.getHours();
		if(currentHour > 4 && currentHour < 10) {
			return "Morning";
		} else if(currentHour < 15) {
			return "Afternoon";
		} else if(currentHour < 20) {
			return "Evening";
		} else {
			return "Night";
		}
	}

	return view.render(userDetails.name, getTimePeriod());
}

export default Greeter;

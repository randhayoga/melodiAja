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
	function render(name, period) {
		return (
			<div id="topbar__greeter">
				<div className="imgWrapper">
					<img src={`/icons/${period.period}.png`} alt="Current Period" />
				</div>
				<div className="greeter__word">
					<p> Good {period.periodWord}, </p>
					<p id="greeter__recipient"> {name}! </p>
				</div>
			</div>
		)
	}

	return {render};
})()

function Greeter() {
	let model = greeterModel;
	let view = greeterView;
	
	let userDetails = model.getData(1);

	const getTimePeriod = () => {
		let date = new Date();
		let currentHour = date.getHours();
		
		let period = (currentHour < 4 || currentHour > 17)? "moon": "sun";
		let periodWord = "night";

		if(currentHour > 4 && currentHour < 10) {
			periodWord = "morning";
		} else if(currentHour < 15) {
			periodWord = "afternoon";
		} else if(currentHour < 20) {
			periodWord = "evening";
		}

		return {
			period: period,
			periodWord: periodWord,
		};
	}

	const render = ({name}) => {
		return view.render(userDetails.name, getTimePeriod());
	}

	return {render};
}

let greeter = Greeter();
export default {
	render: () => greeter.render,
};

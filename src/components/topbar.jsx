import profile from "./profile.jsx"
import greeter from "./greeter.jsx"

import "./styles/topbar.css"

const topBarView = (() => {
	let Greeter = greeter.render;
	let Profile = profile.render;

	function render() {
		return (
			<>
				<section id="topbar">
					<Greeter name="Heidi"/>
					<Profile userID="Heidi"/>
				</section>
			</>
		);
	}
	return {render};
})()

const Topbar = () => {
	let view = topBarView;

	const render = (props) => {
		return view.render();
	}

	return {render};
}

let topbar = Topbar();
export default {
	render: topbar.render,
};

import Profile from "./profile.jsx"
import greeter from "./greeter.jsx"

import "./styles/topbar.css"

function Topbar() {
	let Greeter = greeter.render();

	return (
	<>
		<section id="topbar">
			<Greeter name="Heidi"/>
			<Profile userID="Heidi"/>
		</section>
	</>
	)
}

export default Topbar;

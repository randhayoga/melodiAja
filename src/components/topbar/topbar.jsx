import Profile from "./profile.jsx"
import Greeter from "./greeter.jsx"

import "./styles/topbar.css"

function Topbar() {
	return (
	<>
		<section id="topbar">
			<Greeter userID="Heidi"/>
			<Profile userID="Heidi"/>
		</section>
	</>
	)
}

export default Topbar;

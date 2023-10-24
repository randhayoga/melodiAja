import "./styles/sidebar.css"
import {Link} from "react-router-dom";

const sidebarView = (() => {
	function render() {
		return (
			<section className="sidebar__wrapper" id="sidebar__wrapper">
				<section id="sidebar">
					<div className="sidebar__imgWrapper" id="sidebar__logo"
						onClick={(e) => {
							e.currentTarget.parentNode.parentNode.classList.toggle("sidebar__wrapper--collapsed")
						}}
					>
						<img className="sidebar__menuIcon" src="/img/meLogo.png" alt="Melodi Aja" />
					</div>
					<section className="sidebar__menuGroup">
						<Link to="/discover" className="sidebar__menu" id="sidebar__home">
							<div className="sidebar__imgWrapper">
								<img className="sidebar__menuIcon flt--invert" src="/icons/home.png" alt="Home icon" />
							</div>
							<p className="sidebar__menuName"> Home </p>
						</Link>
						<Link to="/search" className="sidebar__menu" id="sidebar__search">
							<div className="sidebar__imgWrapper">
								<img className="sidebar__menuIcon" src="/icons/search.png" alt="Search icon" />
							</div>
							<p className="sidebar__menuName"> Search </p>
						</Link>
					</section>
					<section className="sidebar__menuGroup">
						<Link to="/myPlaylist" className="sidebar__menu" id="sidebar__playlist">
							<div className="sidebar__imgWrapper">
								<img className="sidebar__menuIcon" src="/icons/playlist.png" alt="Playlist Icon" />
							</div>
							<p className="sidebar__menuName"> Playlist </p>
						</Link>
						<Link to="/myMusic" className="sidebar__menu">
							<div className="sidebar__imgWrapper" id="sidebar__music">
								<img className="sidebar__menuIcon" src="/icons/music.png" alt="Music icon" />
							</div>
							<p className="sidebar__menuName"> Music</p>
						</Link>
					</section>
				</section>
			</section>
		)
	}

	return {render};
})()

const Sidebar = (() => {
	let view = sidebarView;

	const render = (props) => {
		return view.render();
	}
	return {render};
})()

let sidebar = Sidebar;
export default {
	render: sidebar.render,
};

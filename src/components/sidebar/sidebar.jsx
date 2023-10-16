import "./styles/sidebar.css"

const sidebarView = (() => {
	function render() {
		return (
			<section id="sidebar__wrapper">
				<section id="sidebar">
					<div className="sidebar__imgWrapper" id="sidebar__logo">
						<img className="sidebar__menuIcon" src="/img/meLogo.png" alt="Melodi Aja" />
					</div>
					<section className="sidebar__menuGroup">
						<div className="sidebar__menu" id="sidebar__home">
							<div className="sidebar__imgWrapper">
								<img className="sidebar__menuIcon flt--invert" src="/icons/home.png" alt="Home icon" />
							</div>
							<p className="sidebar__menuName"> Home </p>
						</div>
						<div className="sidebar__menu" id="sidebar__search">
							<div className="sidebar__imgWrapper">
								<img className="sidebar__menuIcon" src="/icons/search.png" alt="Search icon" />
							</div>
							<p className="sidebar__menuName"> Search </p>
						</div>
					</section>
					<section className="sidebar__menuGroup">
						<div className="sidebar__menu" id="sidebar__playlist">
							<div className="sidebar__imgWrapper">
								<img className="sidebar__menuIcon" src="/icons/playlist.png" alt="Playlist Icon" />
							</div>
							<p className="sidebar__menuName"> Playlist </p>
						</div>
						<div className="sidebar__menu">
							<div className="sidebar__imgWrapper" id="sidebar__music">
								<img className="sidebar__menuIcon" src="/icons/music.png" alt="Music icon" />
							</div>
							<p className="sidebar__menuName"> Music</p>
						</div>
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

import React from 'react';
import ReactDOM from 'react-dom/client';

import Topbar from "./components/topbar/topbar.jsx";
import Sidebar from "./components/sidebar/sidebar.jsx"
import MusicPlayer from "./components/musicPlayer/musicPlayer.jsx"

// import HomePage from "./components/homePage/homePage.jsx"

import "./App.css";

ReactDOM.createRoot(
	document.getElementById('root')).render(
		<>
			<section id="rootGrid">
				<Sidebar />
				<main>
					<Topbar />
				</main>
			</section>
			<MusicPlayer />
		</>
)

import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider,
	Route,
	Routes,
    BrowserRouter,
} from 'react-router-dom';

import topbar from "./components/topbar.jsx";
import sidebar from "./components/sidebar.jsx";
import homePage from "./components/homePage.jsx";
import userPage from "./components/userPage.jsx";
import searchPage from "./components/searchPage.jsx";
import myPlaylistPage from "./components/myPlaylistPage.jsx";
import musicPlayer from "./components/musicPlayer.jsx";
import myMusicPage from "./components/myMusicPage.jsx";
import musicInfoPage from "./components/musicInfoPage.jsx";
import musicQueue from "./components/musicQueue.jsx";
import uploadMusicForm from "./components/uploadMusicForm.jsx";
import makePlaylistForm from "./components/makePlaylistForm.jsx";
import configProfileForm from "./components/configProfileForm.jsx";
import "./App.css";

function MusicHandler() {
	const MusicPlayer = musicPlayer.render;
	const MusicInfoPage = musicInfoPage.render;
	const [currentMusic, setCurrentMusic] = useState(-1);
	musicPlayer.setMusicSetter(setCurrentMusic);
	return (
		<>
			<MusicInfoPage currentMusic={currentMusic}/>
			<MusicPlayer currentMusic={{
				get: currentMusic,
				set: setCurrentMusic
			}}/>
		</>
	)
}

function App() {
	const Topbar = topbar.render;
	const Sidebar = sidebar.render;
	const HomePage = homePage.render;
	const UserPage = userPage.render;
	const SearchPage = searchPage.render;
	const MyPlaylistPage = myPlaylistPage.render;
	const MyMusicPage = myMusicPage.render;
	const MusicQueue = musicQueue.render;
	const UploadMusicForm = uploadMusicForm.render;
	const MakePlaylistForm = makePlaylistForm.render;
	const ConfigProfileForm = configProfileForm.render;

	return (
		<BrowserRouter>
			<section className="rootGrid">
				<Sidebar />
				<main>
					<Topbar />
						<Routes>
							<Route path="/discover" element={<HomePage />} />
							<Route path="/search" element={<SearchPage />} />
							<Route path="/myPlaylist" element={<MyPlaylistPage />} />
							<Route path="/myMusic" element={<MyMusicPage />} />
							<Route path="/user" element={<UserPage />}>
								<Route path=":id" element={<UserPage />} />
							</Route>
						</Routes>
				</main>
			</section>
			<MusicHandler />
			<UploadMusicForm />
			<MakePlaylistForm />
			<ConfigProfileForm />
			<MusicQueue />
		</BrowserRouter>
	)
}

(function main() {
	ReactDOM.createRoot(
		document.getElementById('root')).render(
			<App />
	)
})()

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider,
	Route,
	Routes,
} from 'react-router-dom';

import topbar from "./components/topbar.jsx";
import sidebar from "./components/sidebar.jsx"
import MusicPlayer from "./components/musicPlayer.jsx"

import HomePage from "./components/homePage.jsx"
import searchPage from "./components/searchPage.jsx"
import userPage from "./components/userPage.jsx"
import myPlaylistPage from "./components/myPlaylistPage.jsx"
import myMusicPage from "./components/myMusicPage.jsx"
import dialogBox from "./components/dialogBox.jsx"

import "./App.css";

let Topbar = topbar.render;
let Sidebar = sidebar.render;
let UserPage = userPage.render;
let SearchPage = searchPage.render;
let MyPlaylistPage = myPlaylistPage.render;
let MyMusicPage = myMusicPage.render;
let TestBox = dialogBox("testing", "Welcome").render;

const ROUTER = createBrowserRouter([
	{
		path: "/*",
		element: (
			<>
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
								<Route path="me" element={<UserPage />} />
								<Route path=":id" element={<UserPage />} />
							</Route>
						</Routes>
					</main>
				</section>
				<MusicPlayer />
				<TestBox Component={
					function() {
						return (
							<>
								<h2> Let me put it in the language you can understand </h2>
								<p> Oh so sorry, no coming here! You deliver, wrong place!</p>
							</>
						)
					}
				}/>
			</>
		),
	},
]);

(function main() {
	ReactDOM.createRoot(
		document.getElementById('root')).render(
			<>
				<RouterProvider router={ROUTER} />
			</>
	)
})()

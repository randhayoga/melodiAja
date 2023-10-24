import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom';

import topbar from "./components/topbar.jsx";
import sidebar from "./components/sidebar.jsx"
import MusicPlayer from "./components/musicPlayer.jsx"

import HomePage from "./components/homePage.jsx"
import searchPage from "./components/searchPage.jsx"
import userPage from "./components/userPage.jsx"

import "./App.css";

let Topbar = topbar.render;
let Sidebar = sidebar.render;
let UserPage = userPage.render;
let SearchPage = searchPage.render;

const ROUTER = createBrowserRouter([
	{
		path: "/discover",
		element: (
			<>
				<section id="rootGrid">
					<Sidebar />
					<main>
						<Topbar />
						<HomePage />
					</main>
				</section>
				<MusicPlayer />
			</>
		),
	},
	{
		path: "/user/:userID",
		element: (
			<>
				<section id="rootGrid">
					<Sidebar />
					<main>
						<Topbar />
						<UserPage />
					</main>
				</section>
				<MusicPlayer />
			</>
		),
	},
	{
		path: "/search",
		element: (
			<>
				<section id="rootGrid">
					<Sidebar />
					<main>
						<Topbar />
						<SearchPage />
					</main>
				</section>
				<MusicPlayer />
			</>
		),
	}
]);

(function main() {
	ReactDOM.createRoot(
		document.getElementById('root')).render(
			<>
				<RouterProvider router={ROUTER} />
			</>
	)
})()

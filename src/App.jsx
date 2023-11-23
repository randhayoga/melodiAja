import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider,
	Route,
	Routes,
} from 'react-router-dom';

import musicPlayer from "./components/musicPlayer.jsx"

/*
import uploadMusicForm from "./components/uploadMusicForm.jsx"
import configProfileForm from "./components/configProfileForm.jsx"
import makePlaylistForm from "./components/makePlaylistForm.jsx"
*/
import "./App.css";

(async function main() {
	const defaultGetRenderer = (module) => module.default.render;

	const Topbar = await import("./components/topbar.jsx").then(defaultGetRenderer);
	const Sidebar = await import("./components/sidebar.jsx").then(defaultGetRenderer);
	const HomePage = await import("./components/homePage.jsx").then(defaultGetRenderer);
	const UserPage = await import("./components/userPage.jsx").then(defaultGetRenderer);
	const SearchPage = await import("./components/searchPage.jsx").then(defaultGetRenderer);
	const MyPlaylistPage = await import("./components/myPlaylistPage.jsx").then(defaultGetRenderer);
	const MusicPlayer = await import("./components/musicPlayer.jsx").then(defaultGetRenderer);
	const MyMusicPage = await import("./components/myMusicPage.jsx").then(defaultGetRenderer);
	const MusicInfoPage = await import("./components/musicInfoPage.jsx").then(defaultGetRenderer);
	const MusicQueue = await import("./components/musicQueue.jsx").then(defaultGetRenderer);
	/*
	const UploadMusicForm = uploadMusicForm.render;
	const ConfigProfileForm = configProfileForm.render;
	const MakePlaylistForm = makePlaylistForm.render;
	*/

	const ROUTER = createBrowserRouter([
		{
			path: "/*",
			element: (
				<>
					<section className="rootGrid">
						<Sidebar />
						<main onClick = {(e) => {
						}} >
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
					<MusicInfoPage />
					<MusicQueue />
					<MusicPlayer />
				</>
			),
		},
	]);

	ReactDOM.createRoot(
		document.getElementById('root')).render(
			<>
				<RouterProvider router={ROUTER} />
			</>
	)
})()

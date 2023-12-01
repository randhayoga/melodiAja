const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const PATH = require("path");
const PUBLIC_PATH = PATH.join("..", "public");
const STATIC_PATH = PATH.join(PUBLIC_PATH, "static");
const AUTH_CONTROLLER = require("./controllers/auth.js");
const INFO_CONTROLLER = require("./controllers/info.js");
const ASSET_CONTROLLER = require("./controllers/assets.js");

(function main() {
	/* ====================
	POST Handlers
	==================== */
	ROUTER.post("/post/comments", (req, res) => {
		console.log(req.body);
		res.status(200).send()
	});

	ROUTER.post("/auth/login",AUTH_CONTROLLER.login);
	ROUTER.post("/auth/signup",AUTH_CONTROLLER.signup);
	ROUTER.post("/auth/changePass", AUTH_CONTROLLER.changePassword);

	/* ====================
	GET: - INFORMATIONS (e.g comments, likes, etc), prefix: info
		 - RESOURCES (e.g. profile picture, music, etc), prefix: assets
	==================== */
	ROUTER.get("/info/searchResult", (req, res) => {
	});

	/*
	ROUTER.get("/info/artist/:id", (req, res) => {
	*/

	ROUTER.get("/info/musicList", INFO_CONTROLLER.getMusicList);
	ROUTER.get("/info/musicPath/:id", INFO_CONTROLLER.getMusicPath);
	ROUTER.get("/info/musicInfo/:id", INFO_CONTROLLER.getMusicInfo);
	ROUTER.get("/info/musicStats/:id", INFO_CONTROLLER.getMusicStats);
	ROUTER.get("/info/comments/:id", INFO_CONTROLLER.getMusicComments);
	ROUTER.get("/info/user/:id", INFO_CONTROLLER.getUserInfo);

	ROUTER.get("/assets/music/:id", (req, res) => {
		const options =  {
			root: PATH.join(__dirname, "..")
		};

		res.sendFile(`datastore/music/${req.params.id}`,
			options,);
	});

	ROUTER.get("/assets/profilePicture/:id", (req, res) => {
	});

	ROUTER.get("/assets/musicCover/:id", (req, res) => {
		const options =  {
			root: PATH.join(__dirname, "..")
		};

		console.log(req.params.id);
		res.sendFile(`datastore/musicCover/${req.params.id}`,
			options,);
	});

	ROUTER.get("/assets/playlistCover/:id", (req, res) => {
	});


	/* ====================
	GET Page handlers
	==================== */
	["/discover", "/search", "/myPlaylist", "/myMusic", "/user/:id"].forEach(
		(path) => {
			ROUTER.get(path, (_, res) => {
				return res.sendFile(PATH.join(__dirname, PUBLIC_PATH, "App.html")) 
			})
		}
	);

	["login", "signup", "changePassword"].forEach(
		(path) => {
			ROUTER.get(`/${path}`, (_, res) => {
				return res.sendFile(PATH.join(__dirname, STATIC_PATH, `${path}.html`))
			})
		}
	);

	ROUTER.get("/", (req, res) => {
		// If not logged in show index.html
		return res.sendFile(PATH.join(__dirname, STATIC_PATH, "index.html"))
		// else show main menu
	});
	
	ROUTER.get("*", (_, res) => {
		return res.sendFile(PATH.join(__dirname, STATIC_PATH, "error.html")) 
	});
})()

module.exports = {
	ROUTES: ROUTER,
};

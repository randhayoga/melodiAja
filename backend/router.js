const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const PATH = require("path");
const PUBLIC_PATH = PATH.join("..", "public");
const STATIC_PATH = PATH.join(PUBLIC_PATH, "static");
const AUTH_CONTROLLER = require("./controllers/auth");

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

	ROUTER.post("/auth/changePass", (req, res) => {
		res.redirect("/login");
	});

	/* ====================
	GET: - INFORMATIONS (e.g comments, likes, etc), prefix: info
		 - RESOURCES (e.g. profile picture, music, etc), prefix: assets
	==================== */
	ROUTER.get("/info/searchResult", (req, res) => {
	});

	ROUTER.get("/info/musicList", (req, res) => {
		res.send({
			musicList: [
				{
					type: "music",
					id: "blal",
					title: "Music1",
					artist: "Artist1",
					imgPath: "/defaults/defaultCover0.jpg",
				},
				{
					type: "music",
					id: "blal2",
					title: "Music2",
					artist: "Artist2",
					imgPath: "/defaults/defaultCover2.jpg",
				},
				{
					type: "music",
					id: "blal3",
					title: "Music3",
					artist: "Artist3",
					imgPath: "/defaults/defaultCover1.jpg",
				}
			]
		})
	});

	ROUTER.get("/info/music/:id", (req, res) => {
		// Dummy
		switch(req.params.id % 3) {
			case 0:
				res.send({musicPath: "/test-music2.mp3"});
				break;
			case 1:
				res.send({musicPath: "/test-music1.mp3"});
				break;
			default:
				res.send({musicPath: "/assets/music/secret.mp3"});
				break;
		}
	});

	ROUTER.get("/info/comments/:id", (req, res) => {
	});

	ROUTER.get("/info/user/:id", (req, res) => {
	});

	ROUTER.get("/info/musicStats/:id", (req, res) => {
	});

	ROUTER.get("/assets/music/:id", (req, res) => {
		const options =  {
			root: PATH.join(__dirname, "..")
		};

		res.sendFile("datastore/GTA San Andreas K Rose Full Station.mp3",
			options,);
	});

	ROUTER.get("/assets/profilePicture/:id", (req, res) => {
	});

	ROUTER.get("/assets/musicCOver/:id", (req, res) => {
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

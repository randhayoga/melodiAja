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
		const musicPath = "/assets/musicCover";
		res.send({
			musicList: [
				{
					type: "music",
					id: "1",
					title: "Bersamamu",
					artist: "Jaz",
					imgPath: `${musicPath}/1.png`,
				},
				{
					type: "music",
					id: "2",
					title: "The Weeknd",
					artist: "Starboy Audio ft. Daft Punk",
					imgPath: `${musicPath}/2.png`,
				},
				{
					type: "music",
					id: "3",
					title: "Penjaga Hati",
					artist: "Nadhif Basalamah ",
					imgPath: `${musicPath}/3.png`,
				},
				{
					type: "music",
					id: "4",
					title: "Seven",
					artist: "Jung Kook",
					imgPath: `${musicPath}/4.png`,
				},
				{
					type: "music",
					id: "5",
					title: "On My Way",
					artist: "Alan Walker, Sabrina Carpenter, & Farruko",
					imgPath: `${musicPath}/5.png`,
				}
			]
		})
	});

	ROUTER.get("/info/musicPath/:id", (req, res) => {
		res.send({musicPath: `/assets/music/${req.params.id}.mp3`});
	});

	ROUTER.get("/info/musicInfo/:id", (req, res) => {
		const musicPath = "/assets/musicCover";
		switch(req.params.id % 5) {
			case 1:
				res.send({
					title: "Bersamamu",
					artist: "Jaz",
					imgPath: `${musicPath}/1.png`,
				});
				break;
			case 2:
				res.send({
					title: "The Weeknd",
					artist: "Starboy Audio ft. Daft Punk",
					imgPath: `${musicPath}/2.png`,
				});
				break;
			case 3:
				res.send({
					title: "Penjaga Hati",
					artist: "Nadhif Basalamah ",
					imgPath: `${musicPath}/3.png`,
				});
				break;
			case 4:
				res.send({
					title: "Seven",
					artist: "Jung Kook",
					imgPath: `${musicPath}/4.png`,
				});
				break;
			default:
				res.send({
					title: "On My Way",
					artist: "Alan Walker, Sabrina Carpenter, & Farruko",
					imgPath: `${musicPath}/5.png`,
				});
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

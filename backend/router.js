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
	
	/*ROUTER.post("/auth/login", (req, res) => {
		res.redirect("/discover");
	});*/

	/*ROUTER.post("/auth/register", (req, res) => {
		res.redirect("/login");
	});*/

	ROUTER.post("/auth/login",AUTH_CONTROLLER.login);

	ROUTER.post("/auth/signup",AUTH_CONTROLLER.signup);

	ROUTER.post("/auth/changePass", (req, res) => {
		res.redirect("/login");
	});

	/*====================
	 GET INFORMATIONS
	====================*/
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

	/* ====================
	GET RESOURCES (e.g. profile picture, music, etc)
	==================== */
	ROUTER.get("/assets/music/:file", (req, res) => {
		const options =  {
			root: PATH.join(__dirname, "..")
		};

		res.sendFile("datastore/GTA San Andreas K Rose Full Station.mp3",
			options,);
	});

	/* ====================
	GET Handlers
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

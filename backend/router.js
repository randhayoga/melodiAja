const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const PATH = require("path");
const PUBLIC_PATH = PATH.join("..", "public");
const STATIC_PATH = PATH.join(PUBLIC_PATH, "static");

(function main() {
	/* ====================
	POST Handlers
	==================== */
	ROUTER.post("/post/comments", (req, res) => {
		console.log(req.body);
		res.status(200).send()
	});
	
	ROUTER.post("/auth/login", (req, res) => {
		res.redirect("/discover");
	});

	ROUTER.post("/auth/register", (req, res) => {
		res.redirect("/login");
	});

	ROUTER.post("/auth/changePass", (req, res) => {
		res.redirect("/login");
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

const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const PATH = require("path");
const PUBLIC_PATH = PATH.join("..", "public");
const STATIC_PATH = PATH.join(PUBLIC_PATH, "static");

(function main() {
	["/discover", "/search", "myPlaylist", "user/:id"].forEach(
		(path) => {
			ROUTER.get(path, (_, res) => {
				return res.sendFile(PATH.join(__dirname, PUBLIC_PATH, "App.html")) 
			})
		}
	);

	ROUTER.get("/login", (_, res) => { 
		return res.sendFile(PATH.join(__dirname, STATIC_PATH, "login.html")) 
	});

	ROUTER.get("/signup", (_, res) => { 
		return res.sendFile(PATH.join(__dirname, STATIC_PATH, "signup.html")) 
	});

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

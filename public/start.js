const EXPRESS = require("express");
const APP = EXPRESS();
const PATH = require("path");
const ROUTER = EXPRESS.Router();

const PORT = 8069;

function setOwnMiddlewares() {
	APP.use(function log(req, _, next) {
		console.log(`${req.method} received at ${Date.now()}\nWants: ${req.originalUrl}`)
		next();
	})
}

(function main() {
	setOwnMiddlewares();

	APP.use(EXPRESS.urlencoded({extended: false}));

	// Determine where static stuff is located
	APP.use(EXPRESS.static(PATH.join(__dirname, "/static")));

	ROUTER.get("/login", (_, res) => { return res.sendFile( PATH.join(__dirname, `static/login.html`)) })
	ROUTER.get("/signup", (_, res) => { return res.sendFile( PATH.join(__dirname, `static/signup.html`)) })

	ROUTER.get("/", (req, res) => {
		// If not logged in show index.html
		return res.sendFile(PATH.join(__dirname, "static/index.html"))
		// else show main menu
	})
	
	ROUTER.get("*", (_, res) => {return res.send("404 Not Found");} )

	APP.use(ROUTER);

	APP.listen(PORT, () => {
		console.log(`ready to serve at localhost:${PORT}`);
	})
})()

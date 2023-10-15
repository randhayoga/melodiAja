const EXPRESS = require("express");
const APP = EXPRESS();
const PATH = require("path");
const ROUTER = EXPRESS.Router();

const PORT = 8069;

const CONFIG = require("./config.js").config;
const DBCONFIG = CONFIG.development.database;

const POOL = require("mariadb").createPool({
	host: DBCONFIG.host,
	port: DBCONFIG.port,
	user: DBCONFIG.user,
	password: DBCONFIG.password,
	database: DBCONFIG.db,
	connectionLimit: DBCONFIG.connectionLimit,
})

function setOwnMiddlewares() {
	APP.use(function log(req, _, next) {
		console.log(`${req.method} received at ${Date.now()}\nWants: ${req.originalUrl}`)
		next();
	})
}

(function main() {
	const SHORTCUTS = {
		public: PATH.join(__dirname, "public"),
		staticPage: PATH.join(__dirname, "public", "static"),
	}

	// Middlewares
	setOwnMiddlewares();
	APP.use(EXPRESS.urlencoded({extended: false}));

	// Determine where static stuff is located
	let imgTTL = 1000 * 1
	APP.use(EXPRESS.static(PATH.join(SHORTCUTS.public), {maxAge: imgTTL}));
	APP.use(EXPRESS.static(PATH.join(SHORTCUTS.public, "static"), {maxAge: imgTTL}));
	APP.use(EXPRESS.static(PATH.join(SHORTCUTS.public, "defaults"), {maxAge: imgTTL}));
	APP.use(EXPRESS.static(PATH.join(SHORTCUTS.public, "icons"), {maxAge: imgTTL}));
	APP.use(EXPRESS.static(PATH.join(SHORTCUTS.public, "img"), {maxAge: imgTTL}));

	
	// App's Routing
	ROUTER.get("/:user/home", (_, res) => {
		return res.sendFile(PATH.join(__dirname, "public", "App.html")) 
	})

	/*
	ROUTER.get("/:user/:password", async (req, res) => {
		CONN = await POOL.getConnection();
		searchResult = await CONN.query(
			`SELECT * FROM User WHERE username = "${req.params.user}" AND password = "${req.params.password}"`
		);

		res.write(`<p> Hello, ${searchResult[0].username}</p>`)
		res.send();
	})
	*/
	ROUTER.get("/login", (_, res) => { 
		return res.sendFile(PATH.join(__dirname, "public", "static", "login.html")) 
	})

	ROUTER.get("/signup", (_, res) => { 
		return res.sendFile(PATH.join(__dirname, "public","static", "signup.html")) 
	})

	ROUTER.get("/", (req, res) => {
		// If not logged in show index.html
		return res.sendFile(PATH.join(__dirname, "public", "static", "index.html"))
		// else show main menu
	})
	
	ROUTER.get("*", (_, res) => {return res.send("404 Not Found");} )

	APP.use(ROUTER);

	APP.listen(PORT, () => {
		console.log(`ready to serve at localhost:${PORT}`);
	})
})()

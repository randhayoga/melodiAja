const EXPRESS = require("express");
const APP = EXPRESS();
const PATH = require("path");
const ROUTES = require("./backend/router.js").ROUTES;
const PORT = 8069;


function setOwnMiddlewares() {
	APP.use(function log(req, _, next) {
		console.log(`${req.method} received at ${Date.now()}\nWants: ${req.originalUrl}`)
		next();
	})
}

(function main() {
	const PUBLIC_PATH = PATH.join(__dirname, "public");

	// Middlewares
	setOwnMiddlewares();
	APP.use(EXPRESS.urlencoded({extended: false}));

	// Determine where static stuff is located
	let imgTTL = 1000 * 1
	APP.use(EXPRESS.static(PATH.join(PUBLIC_PATH), {maxAge: imgTTL}));
	APP.use(EXPRESS.static(PATH.join(PUBLIC_PATH, "static"), {maxAge: imgTTL}));
	APP.use(EXPRESS.static(PATH.join(PUBLIC_PATH, "defaults"), {maxAge: imgTTL}));
	APP.use(EXPRESS.static(PATH.join(PUBLIC_PATH, "icons"), {maxAge: imgTTL}));
	APP.use(EXPRESS.static(PATH.join(PUBLIC_PATH, "img"), {maxAge: imgTTL}));


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

	APP.use(ROUTES);
	APP.listen(PORT, () => {
		console.log(`ready to serve at localhost:${PORT}`);
	})
})()

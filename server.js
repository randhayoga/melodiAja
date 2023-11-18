const EXPRESS = require("express");
const APP = EXPRESS();
const PATH = require("path");
const PORT = 8069;

const ROUTES = require("./backend/router.js").ROUTES;
const BODY_PARSER = require("body-parser");
const MORGAN = require("morgan");

(function main() {
	const PUBLIC_PATH = PATH.join(__dirname, "public");
	
	// Middlewares
	APP.use(MORGAN('combined'))
	APP.use(BODY_PARSER.json());
	APP.use(BODY_PARSER.urlencoded({extended: false}))

	// Determine where static stuff is located
	let imgTTL = 1000 * 1
	APP.use(EXPRESS.static(PATH.join(PUBLIC_PATH), {maxAge: imgTTL}));
	APP.use(EXPRESS.static(PATH.join(PUBLIC_PATH, "static"), {maxAge: imgTTL}));
	APP.use(EXPRESS.static(PATH.join(PUBLIC_PATH, "defaults"), {maxAge: imgTTL}));
	APP.use(EXPRESS.static(PATH.join(PUBLIC_PATH, "icons"), {maxAge: imgTTL}));
	APP.use(EXPRESS.static(PATH.join(PUBLIC_PATH, "img"), {maxAge: imgTTL}));

	APP.use(ROUTES);

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
	

	APP.listen(PORT, () => {
		console.log(`ready to serve at localhost:${PORT}`);
	})
})()

const DBCONFIG = require("./config.js").development.database;
const POOL = require("mariadb").createPool({
	host: DBCONFIG.host,
	port: DBCONFIG.port,
	user: DBCONFIG.user,
	password: DBCONFIG.password,
	database: DBCONFIG.db,
	connectionLimit: DBCONFIG.connectionLimit,
});

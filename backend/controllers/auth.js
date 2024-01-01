const MYSQL = require("mysql")
const BCRYPT = require("bcryptjs");
const PATH = require("path");
const ROOT_PATH = PATH.join(__dirname,"..","..");
const PUBLIC_PATH = PATH.join(ROOT_PATH , "public");
const STATIC_PATH = PATH.join(PUBLIC_PATH, "static");

const DATABASE = MYSQL.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "melodiaja"
})

exports.login = async (req,res) => {
	console.log(req.body);
	console.log("ini controller auth login");
	const {username, password} = req.body;

	DATABASE.query('SELECT * FROM pengguna WHERE username = ?', [username], async (error, result) =>{
		console.log(result);
		if(error){
			console.log(error);
			return res.send({message : "Something went wrong in query", step : "username", url : "/login.html"});
		}
		if(result.length === 0){
			console.log("username ga ada");
			return res.send({message : "Username is not yet registered", step : "username", url : "/login.html"});
		} else {
			if(!await BCRYPT.compare(password, result[0].kata_sandi)){
				console.log("Password salah");
				return res.send({message : "Password is incorrect", step : "password", url : "/login.html"});
			} else {
				return res.send({message : "Successfully logged in!", step : "success", url : "/discover"});
			}
		}
	})
}

exports.signup = async (req,res) => {
    console.log(req.body);
    console.log("ini controller auth signup");
    const { email, name, username, password, confirmPassword } = req.body;
		// Check if email is already registered
		DATABASE.query('SELECT email FROM pengguna WHERE email = ?', [email], async (error, emailResult) => {
			if (error){
				console.log(error);
                return res.send({message : "Something went wrong in email checking", step : "email", url : "/signup.html"});
			}
			if (emailResult.length > 0){
                console.log("email sama");
				return res.send({message : "Email already in use", step : "email", url : "/signup.html"});
			}
	
			// Check if username is already registered
			DATABASE.query('SELECT username FROM pengguna WHERE username = ?', [username], async (error, usernameResult) => {
				if (error){
					console.log(error)
                    return res.send({message : "Something went wrong in username checking", step : "username", url : "/signup.html"});
				}
	
				if (usernameResult.length > 0){
                    console.log("username sama");
					return res.send({message : "Username already in use", step : "username", url : "/signup.html"});
				}
	
				// Hash the password
				let hashedPassword = await BCRYPT.hash(password, 8)
	
				// Insert new user into the database
				DATABASE.query('INSERT INTO pengguna SET ?', {username: username, nama: name, email: email, kata_sandi: hashedPassword, file_img_profile: "default"}, (error, insertResult) => {
					console.log(insertResult);
                    if (error){
						console.log(error)
                        return res.send({message : "Something went wrong in insert new user", step : "insert", url : "/signup.html"});
					} else {
                        console.log("bikin akun berhasil");
						return res.send({message : "New user successfully registered!", step : "insert", url : "/login.html"});
					}
				});
			});
		});
}

exports.changePassword = async(req, res) => {
	const { username, oldPassword, newPassword, reNewPassword } = req.body;
	// check username existence
	DATABASE.query('SELECT * FROM pengguna WHERE username = ?', [username], async (error, result) =>{
		console.log(result);
		if(error){
			console.log(error);
			return res.send({message : "Something went wrong in query", step : "username", url : "/changePassword.html"});
		}
		if(result.length === 0){
			console.log("username ga ada");
			return res.send({message : "Username is not yet registered", step : "username", url : "/changePassword.html"});
		} else {
			if(!await BCRYPT.compare(oldPassword, result[0].kata_sandi)){
				console.log("Password salah");
				return res.send({message : "Password is incorrect", step : "password", url : "/changePassword.html"});
			} else {
				let newHashedPassword = await BCRYPT.hash(newPassword, 8)
				// changePass
				DATABASE.query('UPDATE pengguna SET kata_sandi = ? WHERE username = ?', [newHashedPassword, username], (error, updateResult) => {
					console.log(updateResult);
					if (error){
						console.log(error)
						return res.send({message : "Something went wrong in changing password", step : "change", url : "/changePassword.html"});
					} else {
						console.log("ganti password berhasil");
						return res.send({message : "Password successfully changed!", step : "change", url : "/login.html"});
					}
				});
			}
		}
	})
}

ASSETS_CONTROLLER = require("./assets.js")

exports.userConfigForm = (req, res) => {
	let result = ASSETS_CONTROLLER.saveImage("userPicture", 
		req.body.img.replace(/^data:image\/png;base64,/, "")
	);
	res.send()
}

exports.makePlaylistForm = (req, res) => {
	let result = ASSETS_CONTROLLER.saveImage("playlistCover", 
		req.body.img.replace(/^data:image\/png;base64,/, "")
	);
	res.send()
}

exports.uploadMusicForm = (req, res) => {
	let result = ASSETS_CONTROLLER.saveImage("musicCover", 
		req.body.img.replace(/^data:image\/png;base64,/, "")
	);

	result = ASSETS_CONTROLLER.saveMusic(
		req.body.file.replace(/^data:audio\/mpeg;base64,/, "")
	) && result;

	res.send()
}

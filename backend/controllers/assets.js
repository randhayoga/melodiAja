const PATH = require("path");
const OPTIONS =  {
	root: PATH.join(__dirname, "..", "..", "datastore")
};

exports.getMusic = (req, res) => {
	res.sendFile(`music/${req.params.id}`,
		OPTIONS);
}

exports.getMusicCover = (req, res) => {
	res.sendFile(`musicCover/${req.params.id}`,
		OPTIONS);
}

exports.getUserPicture = (req, res) => {
	res.sendFile(`profilePicture/${req.params.id}`,
		OPTIONS);
}

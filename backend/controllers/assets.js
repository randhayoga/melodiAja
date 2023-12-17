const PATH = require("path");
const FS = require("fs");
const OPTIONS =  {
	root: PATH.join(__dirname, "..", "..", "datastore")
};

const ASSET_PATHS = {
	userPicture: PATH.join(OPTIONS.root, "profilePicture"),
	musicFile: PATH.join(OPTIONS.root, "music"),
	musicCover: PATH.join(OPTIONS.root, "musicCover"),
	playlistCover: PATH.join(OPTIONS.root, "playlistCover")
}

exports.getMusic = (req, res) => {
	const byteRange = 65536
	const requestedFile = `${OPTIONS.root}/music/${req.params.id}`

	const fileSize = FS.statSync(requestedFile).size
	const start = Number(req.headers.range.replace("bytes=", "").split("-")[0])

	let end = start + byteRange;
	if(byteRange + start > fileSize) {
		end = fileSize
	}

	const FILE_STREAM = FS.createReadStream(
		requestedFile, 
		{
			start: Number(start),
			end: Number(end)
		}
	)
	// write stream to response
	FILE_STREAM.pipe(res);
	
	res.writeHead(206, {
		'Content-type': "audio/mp3",
		'Accept-Range': "Bytes",
		'Content-Range': `bytes ${start}-${end}/${fileSize - 1}`,
		'Content-Length': `${end-start}`
	})
}

exports.getMusicCover = (req, res) => {
	res.sendFile(`musicCover/${req.params.id}`,
		OPTIONS);
}

exports.getUserPicture = (req, res) => {
	res.sendFile(`profilePicture/${req.params.id}`,
		OPTIONS);
}

exports.saveImage = (imageGroup, file) => {
	let target;
	switch(imageGroup) {
		case "musicCover":
			target = PATH.join(ASSET_PATHS.musicCover, "test.png");
			break;
		case "playlistCover":
			target = PATH.join(ASSET_PATHS.playlistCover, "test.png");
			break;
		case "userPicture":
			target = PATH.join(ASSET_PATHS.userPicture, "test.png");
			break;
	}

	FS.writeFile( target, file, 'base64', () => 0)
	return 0;
}

exports.saveMusic = (file) => {
	console.log("hmm")
	FS.writeFile(
		PATH.join(ASSET_PATHS.musicFile, "test.mp3"),
		file, 'base64', 
		() => 0
	)
	return 0;
}

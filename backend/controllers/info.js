exports.getMusicArtist = async(req, res) => {
	// Query info tentang user (artist) dengan idLagu tertentu
	// Out: file_img_profile (imgPath), 
	//		nama (artistName),
	//		banyaknya followers (nFollower) => kalau mau. Kalau gak set data dummy
	//		banyaknya lagu (nMusic)
	
	const artistPath = "/assets/profilePicture";
	switch(req.params.id % 5) { 
		case 1:
			res.send({
				imgPath: `${artistPath}/1.png`,
				artistName: "Jaz",
				nFollower: 1000000,
				nMusic: 100
			});
			break;
		case 2:
			res.send({
				imgPath: `${artistPath}/2.png`,
				artistName: "Starboy Audio",
				nFollower: 113000,
				nMusic: 44
			});
			break;
		case 3:
			res.send({
				imgPath: `${artistPath}/3.png`,
				artistName: "Nadhif Basalamah",
				nFollower: 12012,
				nMusic: 11
			});
			break;
		case 4:
			res.send({
				imgPath: `${artistPath}/4.png`,
				artistName: "Jung Kook",
				nFollower: 2130000,
				nMusic: 66
			});
			break;
		default:
			res.send({
				imgPath: `${artistPath}/5.png`,
				artistName: "Alan Walker",
				nFollower: 3120321,
				nMusic: 30
			});
			break;
	}

}

exports.getUserInfo = async(req, res) => {
	// Query info tentang user (artist) dengan idUser tertentu
	// Out: file_img_profile (imgPath), 
	//		nama (name),
	//		username (username),
	//		banyaknya followers (nFollower) => kalau mau
	//		banyaknya lagu (nMusic)
};

exports.getMusicComments = async(req, res) => {
	// Query info tentang komentar dengan idLagu tertentu
	// Out: type: "comment"
	//		username (usernam),
	//		isi_komentar (comment),
	//		file_img_profile (imgPath) => pfp si yang komen
	//		waktu_komentar (commentTime)
	res.send([
		{
			type: "comment",
			username: "Setyo",
			comment: "Musiknya bikin pargoy",
			commentTime: 1031000,
			imgPath: "",
		},
		{
			type: "comment",
			username: "Stefhan",
			comment: "Musiknya bagus membuat saya fokus dalam belajar",
			commentTime: 103,
			imgPath: "",
		},
		{
			type: "comment",
			username: "Setyo",
			comment: "Musiknya bikin pargoy",
			commentTime: 105,
			imgPath: "",
		},
		{
			type: "comment",
			username: "Stefhan",
			comment: "Musiknya bagus membuat saya fokus dalam belajar",
			commentTime: 105,
			imgPath: "",
		},
		{
			type: "comment",
			username: "Setyo",
			comment: "Musiknya bikin pargoy",
			commentTime: 100,
			imgPath: "",
		},
		{
			type: "comment",
			username: "Stefhan",
			comment: "Musiknya bagus membuat saya fokus dalam belajar",
			commentTime: 100,
			imgPath: "",
		},
		{
			type: "comment",
			username: "Randha",
			comment: "Absen yang dengar di tahun  2023!3!3!",
			commentTime: 100,
			imgPath: "",
		},
		{
			type: "comment",
			username: "Atha",
			comment: "Yang datang dari channelnya Windah angkat tangan",
			commentTime: 100,
			imgPath: "",
		},
		{
			type: "comment",
			username: "SikstiNein",
			comment: "Boleh dipakai di channel saya?",
			commentTime: 100,
			imgPath: "",
		},
		{
			type: "comment",
			username: "Setyo",
			comment: "Musiknya bikin pargoy",
			commentTime: 101,
			imgPath: "",
		},
		{
			type: "comment",
			username: "Stefhan",
			comment: "Musiknya bagus membuat saya fokus dalam belajar",
			commentTime: 101,
			imgPath: "",
		},
		{
			type: "comment",
			username: "Randha",
			comment: "Absen yang dengar di tahun  2023!3!3!",
			commentTime: 101,
			imgPath: "",
		},
		{
			type: "comment",
			username: "Atha",
			comment: "Yang datang dari channelnya Windah angkat tangan",
			commentTime: 101,
			imgPath: "",
		},
		{
			type: "comment",
			username: "SikstiNein",
			comment: "Boleh dipakai di channel saya?",
			commentTime: 101,
			imgPath: "",
		},
	]);
}

exports.getMusicInfo = async(req, res) => {
	const dummyStats = {
		nPlay: 1000000,
		nLike: 111221,
		nDislike: 100,
		nComment: 3421
	}
	const musicPath = "/assets/musicCover";

	switch(req.params.id % 5) { 
		case 1:
			res.send({
				title: "Bersamamu",
				artist: "Jaz",
				imgPath: `${musicPath}/1.png`,
				...dummyStats
			});
			break;
		case 2:
			res.send({
				title: "The Weeknd",
				artist: "Starboy Audio ft. Daft Punk",
				imgPath: `${musicPath}/2.png`,
				...dummyStats
			});
			break;
		case 3:
			res.send({
				title: "Penjaga Hati",
				artist: "Nadhif Basalamah ",
				imgPath: `${musicPath}/3.png`,
				...dummyStats
			});
			break;
		case 4:
			res.send({
				title: "Seven",
				artist: "Jung Kook",
				imgPath: `${musicPath}/4.png`,
				...dummyStats
			});
			break;
		default:
			res.send({
				title: "On My Way",
				artist: "Alan Walker, Sabrina Carpenter, & Farruko",
				imgPath: `${musicPath}/5.png`,
				...dummyStats
			});
			break;
	}
}

exports.getMusicPath = async(req, res) => {
	res.send({musicPath: `/assets/music/${req.params.id}.mp3`});
}

exports.getMusicList = async(req, res) => {
	const musicPath = "/assets/musicCover";
	res.send({
		musicList: [
			{
				type: "music",
				id: "1",
				title: "Bersamamu",
				artist: "Jaz",
				imgPath: `${musicPath}/1.png`,
			},
			{
				type: "music",
				id: "2",
				title: "The Weeknd",
				artist: "Starboy Audio ft. Daft Punk",
				imgPath: `${musicPath}/2.png`,
			},
			{
				type: "music",
				id: "3",
				title: "Penjaga Hati",
				artist: "Nadhif Basalamah ",
				imgPath: `${musicPath}/3.png`,
			},
			{
				type: "music",
				id: "4",
				title: "Seven",
				artist: "Jung Kook",
				imgPath: `${musicPath}/4.png`,
			},
			{
				type: "music",
				id: "5",
				title: "On My Way",
				artist: "Alan Walker, Sabrina Carpenter, & Farruko",
				imgPath: `${musicPath}/5.png`,
			}
		]
	})
}

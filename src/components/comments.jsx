import {useState, useEffect} from "react";
import contentList from "./contentList.jsx"

const commentsModel = (() => {
	const fetchComments = (setter) => {
		useEffect(() => {
			setter([
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
		}, []);
	}
	
	return {fetchComments}
})()

const commentsView = (() => {
	let ContentList = contentList().render;

	const render = (commentList) => {
		return (
			<section className="commentList">
				<ContentList itemList={commentList} />
			</section>
		)
	}

	return {render}
})()

export default (() => {
	let view = commentsView;
	let model = commentsModel;
	
	const render = ({id}) => {
		let [comments, setComments] = useState([]);
		
		model.fetchComments(setComments);
		return view.render(comments);
	}

	return {render};
})()

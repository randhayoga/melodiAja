import {useState, useEffect} from "react";
import contentList from "./contentList.jsx"
import "./styles/comments.css"

const commentsModel = (() => {
	const fetchComments = (setter) => {
		useEffect(() => {
			setter([
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
		}, []);
	}
	
	const postComment = async(comment) => {
		if(comment == "") {
			return [-1, "No comment to send!"];
		}

		return await fetch("/post/comments", {
				method: "POST",
				body: JSON.stringify({
					content: comment
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				}
			}).then((response) => {
				if(!response.ok) {
					throw new Error("Network Error: Failed to send comment");
				}
			}).then(() => {
				return [0, "Comment sent!"];
			}).catch((err) => {
				return [-1, err];
		})
	}

	return {fetchComments, postComment}
})()

const commentsView = (() => {
	let ContentList = contentList().render;

	const render = ({commentList, onSubmit}) => {
		let commentDelay = 1000;
		return (
			<section className="commentList">
				<section className="commentField">
					<form className="commentForm" method="post" action="#" id="comment__form"
						onSubmit={ async(e) => {
							e.preventDefault();
							
							let commentInfo = document.getElementById("comment__info");
							let notify = document.getElementById("comment__notification");
							let warning = document.getElementById("comment__warning");
							let [isSuccess, message] = await onSubmit(document.getElementById("comment__textfield").value);
							
							commentInfo.style.display = "block";
							if(isSuccess == 0) {
								notify.style.display = "block";
								notify.textContent = message;
							} else {
								warning.style.display = "block";
								warning.textContent = message;
							}

							setTimeout(() => {
								commentInfo.style.display = "none";
								notify.style.display = "none";
								warning.style.display = "none";
							}, commentDelay);
							
							e.target.reset()
						}}
					>
						<input type="textfield" placeholder="What's in your thoughts?" id="comment__textfield"/>
						<button type="submit" 
							onClick={
								(e) => {
									e.target.style.pointerEvents = "none";
									setTimeout(() => {
										e.target.style.pointerEvents = "auto";
									}, commentDelay)
								}
							}
						> 
							Post 
						</button>
					</form>
					<div id="comment__info">
						<p id="comment__notification"></p>
						<p id="comment__warning"></p>
					</div>
				</section>
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
		return view.render({
			commentList: comments,
			onSubmit: model.postComment
		});
	}

	return {render};
})()

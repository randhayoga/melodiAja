import modal from "./modal.jsx"
import "./styles/makePlaylistForm.css"
import "./styles/form.css"

const makePlaylistModel = (() => {

})()

const makePlaylistView = (() => {
	let modalObj = modal("makePlaylistForm", "Create Playlist");
	let Modal = modalObj.render;
	const CANVAS_WIDTH = 240;
	const CANVAS_HEIGHT = 240;

	const toggle = () => {
		modalObj.toggle();
	}

	const clearCanvas = () => {
		document.getElementById("makePlaylist__imgPreviewCaption")
			.classList.remove("form__imgPreviewCaption--hidden")
		document.getElementById("makePlaylist__imgPreview")
			.getContext("2d")
			.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
	}

	const Form = () => {
		return (
			<form action="" id="makePlaylist">
				<div className="form__section form__imgInputSection">
					<canvas 
						height={CANVAS_HEIGHT} 
						width={CANVAS_WIDTH} 
						id="makePlaylist__imgPreview"
						className="form__imgPreview"
					>
					</canvas>
					<div 
						style={{
							height: CANVAS_HEIGHT,
							width: CANVAS_WIDTH,
						}} 
						className="form__imgPreviewCaption"
						id="makePlaylist__imgPreviewCaption"
						onClick = {() => {
							document.getElementById("makePlaylist__img").click()
						}}
					>
						<p > Click here to choose new playlist image </p>
					</div>
					<input 
						id="makePlaylist__img"
						className="form__imgInput"
						type="file" 
						accept="image/*"
						onChange={() => {
							document.getElementById("makePlaylist__imgPreviewCaption")
								.classList.add("form__imgPreviewCaption--hidden")
							let ctx = document.getElementById("makePlaylist__imgPreview")
									.getContext("2d");
							let data = document.getElementById("makePlaylist__img")
									.files[0]

							let img = new Image();
							img.src = URL.createObjectURL(data)
							img.onload = () => ctx.drawImage(
								img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT
							);
						}}
					/>
				</div>
				<div className="form__detailsWrapper">
					<div className="form__section form__details">
						<div className="form__entry">
							<label htmlFor="makePlaylist__title"> Playlist name </label>
							<input type="text"
								required
								id="makePlaylist__title"
								className="formEntry__text"
								placeholder="If this is real, I don't need to dream"
							/>
							<div className="entry__warning" id="warning__playlistName"></div>
						</div>
						<div className="form__entry">
							<label htmlFor="makePlaylist__visibility"> Visibility </label>
							<select 
								id="makePlaylist__visibility" 
								className="formEntry__selection" 
								name="visibility"
							>
								<option value="private"> Private </option>
								<option value="public"> Public </option>
							</select>
							<div className="entry__warning" id="warning__playListVisibility"></div>
						</div>
					</div>

					<button id="makePlaylist__upload" className="form__submitButton"> Confirm </button>
				</div>
			</form>
		)
	}

	const render = () => {
		return (
			<>
				<Modal component={Form}/>
			</>
		)
	}

	return {render, toggle, clearCanvas}
})()

export default (() => {
	let view = makePlaylistView;
	let model = makePlaylistModel;

	const render = () => {
		return view.render();
	}

	const toggle = () => {
		document.getElementById("makePlaylist").reset();
		view.clearCanvas();
		view.toggle();
	}

	return {render, toggle};
})()

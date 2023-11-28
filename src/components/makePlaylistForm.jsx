import modal from "./modal.jsx"
import "./styles/makePlaylistForm.css"
import "./styles/form.css"

const makePlaylistModel = (() => {
	const validateData = (playlistName, setWarning) => {
		let isValid = true;

		// Regex
		let tempRegexMatch = playlistName.match(/[a-zA-Z][a-zA-Z0-9 ]{2,63}/)
		if(tempRegexMatch == null || tempRegexMatch[0].length < playlistName.length) {
			setWarning(
				"warning__makePlaylistName", 
				"Playlist name should be between 3 to 64 characters long and contains only alphanumeric characters and space"
			);
			isValid = false;
		}

		if(playlistName == "") {
			isValid = false;
			setWarning("warning__makePlaylistName", "Please enter the playlist name");
		}

		return isValid;
	}


	const handleData = async(formData, setWarning) => {
		const data = formData.get("name");
		const isValid = validateData(data, setWarning);

		if(isValid) {
			// fetch thingamajig
			return 0;
		}
		return -1;
	}

	return {handleData}
})()

const makePlaylistView = (() => {
	let modalObj = modal("makePlaylistForm", "Create Playlist");
	let Modal = modalObj.render;
	const CANVAS_WIDTH = 240;
	const CANVAS_HEIGHT = 240;

	const clearCanvas = () => {
		document.getElementById("makePlaylist__imgPreviewCaption")
			.classList.remove("form__imgPreviewCaption--hidden")
		document.getElementById("makePlaylist__imgPreview")
			.getContext("2d")
			.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
	}

	const cleanWarning = () => {
		document.getElementById(`warning__makePlaylistName`)
			.classList.remove("entry__warning--showing")
	}

	const setWarning = (elemID, message) => {
		let elem = document.getElementById(elemID);
		elem.classList.add("entry__warning--showing");
		elem.textContent = message;
	}

	const toggle = () => {
		modalObj.toggle();
		cleanWarning();
	}

	const makeForm = (handlers) => {
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
						name="cover"
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
								name="name"
								required
								id="makePlaylist__title"
								className="formEntry__text"
								placeholder="If this is real, I don't need to dream"
							/>
							<div className="entry__warning" id="warning__makePlaylistName"></div>
						</div>
						<div className="form__entry">
							<label htmlFor="makePlaylist__visibility"> Visibility </label>
							<select 
								name="visibility"
								id="makePlaylist__visibility" 
								className="formEntry__selection" 
							>
								<option value="private"> Private </option>
								<option value="public"> Public </option>
							</select>
							<div className="entry__warning" id="warning__makePlaylistVisibility"></div>
						</div>
					</div>

					<button 
						id="makePlaylist__upload" 
						className="form__submitButton"
						onClick = {(e) => {
							e.preventDefault();
							cleanWarning();
							handlers.handleData(new FormData(
								document.getElementById("makePlaylist"),
								e.currentTarget
							), setWarning);
						}}
					> Confirm </button>
				</div>
			</form>
		)
	}

	const render = (handlers) => {
		const Form = () => makeForm(handlers);
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
		return view.render({
			handleData: model.handleData
		});
	}

	const toggle = () => {
		document.getElementById("makePlaylist").reset();
		view.clearCanvas();
		view.toggle();
	}

	return {render, toggle};
})()

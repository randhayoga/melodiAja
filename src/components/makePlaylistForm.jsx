import modal from "./modal.jsx"
import form from "./form.jsx"
import "./styles/makePlaylistForm.css"
import "./styles/form.css"

const makePlaylistModel = (() => {
	const gatherData = formData => ({
		name: formData.get("name"),
		visibility: formData.get("visibility"),
	})

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
		const data = gatherData(formData)
		const isValid = validateData(data.name, setWarning);

		if(isValid) {
			fetch("/forms/playlistUpload", {
				method: "POST",
				body: JSON.stringify({
					name: data.name,
					visibility: data.visibility,
					img: document.getElementById("makePlaylist__imgPreview").toDataURL()
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				}
			}).catch(() => {
				console.log("Something's wrong")
			})
			return 0;
		}
		return -1;
	}

	return {handleData}
})()

const makePlaylistView = (() => {
	const CANVAS_WIDTH = 240;
	const CANVAS_HEIGHT = 240;
	let modalObj = modal("makePlaylistForm", "Create Playlist");
	const formObj = form(
		"makePlaylist", 
		["Name"],
		{CANVAS_HEIGHT: CANVAS_HEIGHT, CANVAS_WIDTH: CANVAS_WIDTH}
	)
	let Modal = modalObj.render;

	const setWarning = (elemID, message) => { formObj.setWarning(elemID, message) }
	const clearCanvas = () => formObj.clearCanvas()

	const toggle = () => {
		modalObj.toggle();
		formObj.clearWarning();
	}

	const render = (handlers) => {
		const Form = () => (
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
						onChange={() => formObj.changePreviewImage(
							URL.createObjectURL(
								document.getElementById("makePlaylist__img").files[0]
							)
						)}
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
						onClick = {async(e) => {
							e.preventDefault();
							formObj.clearWarning();

							const status = await handlers.handleData(
								new FormData(
									document.getElementById("makePlaylist"),
									e.currentTarget
								), 
							setWarning);
							if(status == 0) toggle();
						}}
					> Confirm </button>
				</div>
			</form>
		);

		return <> <Modal component={Form}/> </>
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

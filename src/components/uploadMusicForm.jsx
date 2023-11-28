import modal from "./modal.jsx"
import form from "./form.jsx"
import "./styles/uploadMusicForm.css"
import "./styles/form.css"

const uploadMusicModel = (() => {
	const gatherData = formData => ({
		cover: formData.get("cover"),
		title: formData.get("title"),
		genre: formData.get("genre"),
		file: formData.get("file"),
	})

	const validateData = (data, setWarning) => {
		const {cover, title, genre, file} = data
		let isValid = true;

		let tempRegexMatch = title.match(/[a-zA-Z][a-zA-Z0-9 ]{2,63}/)
		if(tempRegexMatch == null || tempRegexMatch[0].length < title.length) {
			setWarning(
				"warning__uploadMusicTitle", 
				"Title should be between 3 to 64 characters long and contains only alphanumeric characters"
			);
			isValid = false;
		}

		if(title == "") {
			isValid = false;
			setWarning("warning__uploadMusicTitle", "Please enter the title");
		}

		if(genre == "") {
			isValid = false;
			setWarning("warning__uploadMusicGenre", "Please choose the genre of your music");
		}

		if(file.size == 0) {
			isValid = false;
			setWarning("warning__uploadMusicFile", "Please insert your music file");
		}

		return isValid;
	}

	const handleData = async(formData, setWarning) => {
		const data = gatherData(formData);
		const isValid = validateData(data, setWarning);

		if(isValid) {
			// fetch thingamajig
			return 0;
		}
		return -1;
	}

	return {handleData}

})()

const uploadMusicView = (() => {
	const CANVAS_WIDTH = 240;
	const CANVAS_HEIGHT = 240;
	const modalObj = modal("uploadMusicForm", "Upload Music");
	const formObj = form(
		"uploadMusic", 
		["Title", "Genre", "File"],
		{CANVAS_HEIGHT: CANVAS_HEIGHT, CANVAS_WIDTH: CANVAS_WIDTH}
	)
	const Modal = modalObj.render;

	const setWarning = (elemID, message) => formObj.setWarning(elemID, message)
	const clearCanvas = () => formObj.clearCanvas()
	const toggle = () => {
		modalObj.toggle();
		formObj.clearWarning();
	}

	const render = (handlers) => {
		const Form = () => (
			<form action="" id="uploadMusic">
				<div className="form__section form__imgInputSection">
					<canvas 
						height={CANVAS_HEIGHT} 
						width={CANVAS_WIDTH} 
						id="uploadMusic__imgPreview"
						className="form__imgPreview"
					>
					</canvas>
					<div 
						style={{
							height: CANVAS_HEIGHT,
							width: CANVAS_WIDTH,
						}} 
						className="form__imgPreviewCaption"
						id="uploadMusic__imgPreviewCaption"
						onClick = {() => {
							document.getElementById("uploadMusic__img").click()
						}}
					>
						<p > Click here to add image </p>
					</div>
					<input 
						name="cover"
						id="uploadMusic__img"
						className="form__imgInput"
						type="file" 
						accept="image/*"
						onChange={() => formObj.changePreviewImage(
							URL.createObjectURL(
								document.getElementById("uploadMusic__img").files[0]
							)
						)}
					/>
				</div>
				<div className="form__detailsWrapper">
					<div className="form__section form__details">
						<div className="form__entry">
							<label htmlFor="uploadMusic__title"> Music title </label>
							<input type="text"
								name="title"
								required
								id="uploadMusic__title"
								className="formEntry__text"
								placeholder="If this is real, I don't need to dream"
							/>
							<div className="entry__warning" id="warning__uploadMusicTitle"></div>
						</div>
						<div className="form__entry">
							<label htmlFor="uploadMusic__composer"> Music composer </label>
							<input type="text"
								name="composer"
								id="uploadMusic__composer"
								className="formEntry__text"
								placeholder="Timothy Prescott"
							/>
							<div className="entry__warning" id="warning__uploadMusicComposer"></div>
						</div>
						<div className="form__entry">
							<label htmlFor="uploadMusic__genre"> Music genre </label>
							<select id="uploadMusic__genre" 
								className="formEntry__selection" 
								name="genre"
							>
								<option value=""> Select genre </option>
								<option value="chillout"> Chillout </option>
								<option value="classic"> Classic </option>
								<option value="electronic"> Electronic </option>
								<option value="folk"> Folk Music </option>
								<option value="indie"> Indie </option>
								<option value="jazz"> Jazz </option>
								<option value="pop"> Pop </option>
								<option value="rock"> Rock </option>
								<option value="romantic"> Romantic </option>
								<option value="other"> Other </option>
							</select>
							<div className="entry__warning" id="warning__uploadMusicGenre"></div>
						</div>
						<div className="form__entry">
							<label htmlFor="uploadMusic__musicFile"> Music file </label>
							<input type="file"
								name="file"
								required
								id="uploadMusic__musicFile"
								accept=".mp3"
							/>
							<div className="entry__warning" id="warning__uploadMusicFile"></div>
						</div>
					</div>

					<button 
						id="uploadMusic__upload" 
						className="form__submitButton"
						onClick={(e) => {
							e.preventDefault();
							formObj.clearWarning();
							handlers.handleData(new FormData(
								document.getElementById("uploadMusic"),
								e.currentTarget
							), setWarning);
						}}
					> Upload </button>
				</div>
			</form>
		);

		return <> <Modal component={Form}/> </>;
	}

	return {render, toggle, clearCanvas}
})()

export default (() => {
	let view = uploadMusicView;
	let model = uploadMusicModel;

	const render = () => {
		return view.render({
			handleData: model.handleData
		});
	}

	const toggle = () => {
		document.getElementById("uploadMusic").reset();
		view.clearCanvas();
		view.toggle();
	}

	return {render, toggle};
})()

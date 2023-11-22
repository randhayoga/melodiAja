import modal from "./modal.jsx"
import "./styles/uploadMusicForm.css"
import "./styles/form.css"

const uploadMusicModel = (() => {

})()

const uploadMusicView = (() => {
	let modalObj = modal("uploadMusicForm", "Upload Music");
	let Modal = modalObj.render;
	const CANVAS_WIDTH = 240;
	const CANVAS_HEIGHT = 240;

	const toggle = () => {
		modalObj.toggle();
	}

	const clearCanvas = () => {
		document.getElementById("uploadMusic__imgPreviewCaption")
			.classList.remove("uploadMusic__imgPreviewCaption--hidden")
		document.getElementById("uploadMusic__imgPreview")
			.getContext("2d")
			.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
	}

	const Form = () => {
		return (
			<form action="" id="uploadMusic">
				<div className="form__section uploadMusic__coverImg">
					<canvas 
						height={CANVAS_HEIGHT} 
						width={CANVAS_WIDTH} 
						id="uploadMusic__imgPreview"
					>
					</canvas>
					<div 
						style={{
							height: CANVAS_HEIGHT,
							width: CANVAS_WIDTH,
						}} 
						className="uploadMusic__imgPreviewCaption"
						id="uploadMusic__imgPreviewCaption"
						onClick = {() => {
							document.getElementById("uploadMusic__img").click()
						}}
					>
						<p > Click here to add image </p>
					</div>
					<input 
						id="uploadMusic__img"
						type="file" 
						accept="image/*"
						onChange={() => {
							document.getElementById("uploadMusic__imgPreviewCaption")
								.classList.add("uploadMusic__imgPreviewCaption--hidden")
							let ctx = document.getElementById("uploadMusic__imgPreview")
									.getContext("2d");
							let data = document.getElementById("uploadMusic__img")
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
							<label htmlFor="uploadMusic__title"> Music title </label>
							<input type="text"
								required
								id="uploadMusic__title"
								placeholder="If this is real, I don't need to dream"
							/>
							<div className="entry__warning" id="warning__musicTitle"></div>
						</div>
						<div className="form__entry">
							<label htmlFor="uploadMusic__composer"> Music composer </label>
							<input type="text"
								id="uploadMusic__composer"
								placeholder="Timothy Prescott"
							/>
							<div className="entry__warning" id="warning__musicComposer"></div>
						</div>
						<div className="form__entry">
							<label htmlFor="uploadMusic__genre"> Music genre </label>
							<select id="uploadMusic__genre" name="musicGenre">
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
							<div className="entry__warning" id="warning__musicGenre"></div>
						</div>
						<div className="form__entry">
							<label htmlFor="uploadMusic__musicFile"> Music file </label>
							<input type="file"
								required
								id="uploadMusic__musicFile"
								accept=".mp3"
							/>
							<div className="entry__warning" id="warning__musicFile"></div>
						</div>
					</div>

					<button id="uploadMusic__upload">Upload</button>
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
	let view = uploadMusicView;
	let model = uploadMusicModel;

	const render = () => {
		return view.render();
	}

	const toggle = () => {
		document.getElementById("uploadMusic").reset();
		view.clearCanvas();
		view.toggle();
	}

	return {render, toggle};
})()

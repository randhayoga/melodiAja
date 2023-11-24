import modal from "./modal.jsx"
import "./styles/configProfileForm.css"
import "./styles/form.css"

const configProfileModel = (() => {
	const gatherData = (formData) => {
		return {
			userPFP: formData.get("userPFP"),
			displayName: formData.get("displayName"),
			username: formData.get("username"),
		}
	}

	const validateData = ({userPFP, displayName, username}, setWarning) => {
		// At least one should be changed
		const atleastOneFilled = ( 
			userPFP.size > 0
			|| username != "" 
			|| displayName != ""
		);
		
		// Regex
		console.log(!/[\W]/.test(username));
		let isValid = atleastOneFilled;

		isValid = false;
		if(!isValid) {
			if(!atleastOneFilled) {
				setWarning("warning__userConfigUsername", "Please change atleast 1 item");
			} else {
				setWarning("warning__userConfigUsername", "Something is wrong");
			}
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

const configProfileView = (() => {
	let modalObj = modal("configProfileForm", "Profile Configuration");
	let Modal = modalObj.render;
	const CANVAS_WIDTH = 240;
	const CANVAS_HEIGHT = 240;

	const cleanWarning = () => {
		[
			"DisplayName",
			"Username"
		].forEach((item) => {
			document.getElementById(`warning__userConfig${item}`)
				.classList.remove("entry__warning--showing")
		})
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

	const clearCanvas = () => {
		document.getElementById("configProfile__imgPreviewCaption")
			.classList.remove("form__imgPreviewCaption--hidden")
		document.getElementById("configProfile__imgPreview")
			.getContext("2d")
			.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
	}

	const changePreviewImage = (data) => {
		document.getElementById("configProfile__imgPreviewCaption")
			.classList.add("form__imgPreviewCaption--hidden")
		const ctx = document.getElementById("configProfile__imgPreview")
				.getContext("2d");

		const img = new Image();
		img.src = data;
		img.onload = () => ctx.drawImage(
			img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT
		);
	}

	const genForm = (handlers) => {
		return (
			<form action="" id="configProfile">
				<div className="form__section form__imgInputSection">
					<canvas 
						height={CANVAS_HEIGHT} 
						width={CANVAS_WIDTH} 
						id="configProfile__imgPreview"
						className="form__imgPreview"
					>
					</canvas>
					<div 
						style={{
							height: CANVAS_HEIGHT,
							width: CANVAS_WIDTH,
						}} 
						className="form__imgPreviewCaption"
						id="configProfile__imgPreviewCaption"
						onClick = {() => {
							document.getElementById("configProfile__img").click()
						}}
					>
						<p> Click here to choose new profile image </p>
					</div>
					<input 
						name="userPFP"
						id="configProfile__img"
						className="form__imgInput"
						type="file" 
						accept="image/*"
						onChange={() => changePreviewImage(
							URL.createObjectURL(
								document.getElementById("configProfile__img").files[0]
							)
						)}
					/>
				</div>
				<div className="form__detailsWrapper">
					<div className="form__section form__details">
						<div className="form__entry">
							<label htmlFor="configProfile__displayName"> Display name </label>
							<input type="text"
								name="displayName"
								className="formEntry__text"
								id="configProfile__displayName"
								placeholder="If this is real, I don't need to dream"
							/>
							<div className="entry__warning" id="warning__userConfigDisplayName"></div>
						</div>
						<div className="form__entry">
							<label htmlFor="configProfile__username" > Username </label>
							<input type="text"
								name="username"
								id="configProfile__username"
								className="formEntry__text"
								placeholder="Timothy Prescott"
							/>
							<div className="entry__warning" id="warning__userConfigUsername"></div>
						</div>
					</div>

					<button 
						id="configProfile__upload" 
						className="form__submitButton"
						onClick={(e) => {
							e.preventDefault();
							cleanWarning();
							handlers.handleData(new FormData(
								document.getElementById("configProfile"),
								e.currentTarget
							), setWarning);
						}}
					> Submit </button>
				</div>
			</form>
		)
	}

	// Current user's profile image
	const loadCurrentlyUsedImage = () => {
		changePreviewImage(document.getElementById("currentUser__PFP").src);
	}

	const render = (handlers) => {
		const Form = () => genForm(handlers);
		return (
			<>
				<Modal component={Form}/>
			</>
		)
	}

	return {render, toggle, clearCanvas, loadCurrentlyUsedImage}
})()

export default (() => {
	let view = configProfileView;
	let model = configProfileModel;

	const render = () => {
		return view.render({
			handleData: model.handleData
		});
	}

	const toggle = () => {
		document.getElementById("configProfile").reset();
		view.clearCanvas();
		view.toggle();
	}

	const loadCurrentlyUsedImage = () => {
		view.loadCurrentlyUsedImage();
	}

	return {render, toggle, loadCurrentlyUsedImage};
})()

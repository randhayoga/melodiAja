import modal from "./modal.jsx"
import form from "./form.jsx"
import "./styles/form.css"
import "./styles/configProfileForm.css"

const configProfileModel = (() => {
	const gatherData = formData => ({
		userPFP: formData.get("userPFP"),
		displayName: formData.get("displayName"),
		username: formData.get("username"),
	})

	const validateData = ({userPFP, displayName, username}, setWarning) => {
		// At least one should be changed
		const usernameFilled = username != ""
		const pictureFilled = userPFP.size > 0
		const displayNameFilled = displayName != ""
		const atleastOneFilled = pictureFilled || usernameFilled || displayNameFilled;
		let isValid = atleastOneFilled;
		
		if(!atleastOneFilled) setWarning("warning__configProfileUsername", "Please change atleast 1 item");
		else {
			let tempRegexMatch;
			if(usernameFilled) {
				tempRegexMatch = username.match(/[a-zA-Z][a-zA-Z0-9_]{6,15}/)
				if(tempRegexMatch == null 
					|| tempRegexMatch[0].length < username.length) 
				{
					setWarning(
						"warning__configProfileUsername", 
						"Username should be between is 7 to 16 characters long and only contain alphanumeric characters and underscore"
					);
					isValid = false;
				}
			}

			if(displayNameFilled) {
				tempRegexMatch= displayName.match(/[a-zA-Z][a-zA-Z ]{2,31}/)
				if(tempRegexMatch == null 
					|| tempRegexMatch[0].length < displayName.length) 
				{
					setWarning(
						"warning__configProfileDisplayName", 
						"Display name should be between 3 to 32 characters long and only contains alphabets and space"
					);
					isValid = false;
				}
			}
		}

		return isValid;
	}

	const handleData = async(formData, setWarning) => {
		const data = gatherData(formData);
		const isValid = validateData(data, setWarning);

		if(isValid) {
			fetch("/forms/userConfig", {
				method: "POST",
				body: JSON.stringify({
					name: data.username,
					displayName: data.displayName,
					img: document.getElementById("configProfile__imgPreview").toDataURL()
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

const configProfileView = (() => {
	const CANVAS_WIDTH = 240;
	const CANVAS_HEIGHT = 240;
	const modalObj = modal("configProfileForm", "Profile Configuration");
	const formObj = form(
		"configProfile", 
		["DisplayName", "Username"],
		{CANVAS_HEIGHT: CANVAS_HEIGHT, CANVAS_WIDTH: CANVAS_WIDTH}
	)
	const Modal = modalObj.render;

	const setWarning = (elemID, message) => formObj.setWarning(elemID, message)
	const clearCanvas = () => formObj.clearCanvas()
	const toggle = () => {
		modalObj.toggle();
		formObj.clearWarning();
	}

	// Current user's profile image
	const loadCurrentlyUsedImage = () => {
		formObj.changePreviewImage(document.getElementById("currentUser__PFP").src);
	}

	const render = (handlers) => {
		const Form = () => (
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
						onChange={() => formObj.changePreviewImage(
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
							<div className="entry__warning" id="warning__configProfileDisplayName"></div>
						</div>
						<div className="form__entry">
							<label htmlFor="configProfile__username" > Username </label>
							<input type="text"
								name="username"
								id="configProfile__username"
								className="formEntry__text"
								placeholder="Timothy Prescott"
							/>
							<div className="entry__warning" id="warning__configProfileUsername"></div>
						</div>
					</div>

					<button 
						id="configProfile__upload" 
						className="form__submitButton"
						onClick={async(e) => {
							e.preventDefault();
							formObj.clearWarning();

							const status = await handlers.handleData(
								new FormData(
									document.getElementById("configProfile"),
									e.currentTarget
								), 
							setWarning);
							if(status == 0) toggle();
						}}
					> Submit </button>
				</div>
			</form>
		);

		return <> <Modal component={Form}/> </>;
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

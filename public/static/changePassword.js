let form = document.getElementById("changePassForm")
let button = document.getElementById("changePassForm__submit")
button.addEventListener("click", async(e) => {
    e.preventDefault()
    let formIsValid = true;

    // Check if it's fulfilled
    ["username", "oldPassword", "newPassword", "reNewPassword"].forEach((entry) => {
        let elem = document.getElementById(`user__${entry}`)
        let warningElem = document.getElementById(`warning__${entry}`);

        warningElem.textContent = ""
        if (elem.validity.valueMissing) {
            warningElem.textContent = "Please fill out this field"
        }

        formIsValid = formIsValid && !elem.validity.valueMissing;
    })

    // newPassword too short 
    elem = document.getElementById("user__newPassword")
    warningElem = document.getElementById(`warning__newPassword`);
    if (elem.validity.tooShort) {
        warningElem.textContent = "Please enter longer password"
        formIsValid = false;
    }

    // Check newPassword == reNewPassword
    elem = document.getElementById("user__newPassword")
    warningElem = document.getElementById(`warning__reNewPassword`);
    let elemConfirmPass = document.getElementById("user__reNewPassword")
    if (elem.value != "" && (elem.value != elemConfirmPass.value)) {
        warningElem.textContent = "Password and confirmation password don't match"
        formIsValid = false;
    }

    const USERNAME = document.getElementById(`user__username`).value;
    const OLD_PASSWORD = document.getElementById(`user__oldPassword`).value;
    const NEW_PASSWORD = document.getElementById(`user__newPassword`).value;
    const RE_NEW_PASSWORD = document.getElementById(`user__reNewPassword`).value;

    const FORM_DATA = {
        username: USERNAME,
        oldPassword: OLD_PASSWORD,
        newPassword: NEW_PASSWORD,
        reNewPassword: RE_NEW_PASSWORD,
    };

    let response;
    if (formIsValid) {
        response = await fetch("/auth/changePass", {
            method: "post",
            headers:  { 'Content-Type': 'application/json' },
            body: JSON.stringify(FORM_DATA)
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            console.log(data.message);
            switch (data.step) {
                case "password":
                    warningElem = document.getElementById(`warning__oldPassword`);
                    warningElem.textContent = data.message;
                    return 0;
                    break;
                case "username":
                    warningElem = document.getElementById(`warning__username`);
                    warningElem.textContent = data.message;
                    return 0;
                    break;
                case "change":
                    alert(data.message);
                    window.location.replace(data.url)
                    return 0;
                    break;
            }
            throw new Error();
        
        }).catch((err) => {
            console.log(err);
            return -1;
        });
    }

    if (response != 0) {
        let warningElem = document.getElementById("warning__reNewPassword");
        switch (response) {
            case -1:
                warningElem.textContent = "Failed to establish connection to server"
                break;
            case -2: // Handle user not found and wrong password
                warningElem.textContent = "username and password don't match"
                break;
        }
    }
})

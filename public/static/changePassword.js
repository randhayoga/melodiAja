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

    let response;
    if (formIsValid) {
        response = await fetch("/auth/changePass", {
            method: "post"
        }).then((res) => {
            if (res.ok) {
                window.location.replace(res.url);
                return 0;
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
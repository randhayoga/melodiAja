let form = document.getElementById("signupForm")
let button = document.getElementById("signupForm__submit")
button.addEventListener("click", async(e) => {
    e.preventDefault();

    let formIsValid = true;
    let elem;
    let warningElem;

    // Check if it's fulfilled
    ["email", "name", "username", "password", "confirmPassword"].forEach((entry) => {
        elem = document.getElementById(`user__${entry}`)

        warningElem = document.getElementById(`warning__${entry}`);
        warningElem.textContent = ""
        if (elem.validity.valueMissing) {
            warningElem.textContent = "Please fill out this field"
        }

        formIsValid = formIsValid && !elem.validity.valueMissing;
    })

    // Check email
    elem = document.getElementById("user__email")
    warningElem = document.getElementById(`warning__email`);
    if (elem.validity.typeMismatch) {
        warningElem.textContent = "Please enter a valid email"
        formIsValid = false;
    }

    // Check password == confirmPassword
    elem = document.getElementById("user__password")
    warningElem = document.getElementById(`warning__confirmPassword`);
    let elemConfirmPass = document.getElementById("user__confirmPassword")
    if (elem.value != "" && (elem.value != elemConfirmPass.value)) {
        warningElem.textContent = "Password and confirmation password don't match"
        formIsValid = false;
    }

    // Password too short 
    elem = document.getElementById("user__password")
    warningElem = document.getElementById(`warning__password`);
    if (elem.validity.tooShort) {
        warningElem.textContent = "Please enter longer password"
        formIsValid = false;
    }

    const EMAIL = document.getElementById(`user__email`).value;
    const NAME = document.getElementById(`user__name`).value;
    const USERNAME = document.getElementById(`user__username`).value;
    const PASSWORD = document.getElementById(`user__password`).value;
    const CONFIRM_PASSWORD = document.getElementById(`user__confirmPassword`).value;

    const FORM_DATA = {
        email: EMAIL,
        name: NAME,
        username: USERNAME,
        password: PASSWORD,
        confirmPassword: CONFIRM_PASSWORD
    };

    let response;
    if (formIsValid) {
        response = await fetch("/auth/signup", {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(FORM_DATA)
            })
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                console.log(data.message);
                switch (data.step) {
                    case "email":
                        warningElem = document.getElementById(`warning__email`);
                        warningElem.textContent = data.message;
                        return 0;
                        break;
                    case "username":
                        warningElem = document.getElementById(`warning__username`);
                        warningElem.textContent = data.message;
                        return 0;
                        break;
                    case "insert":
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
        switch (response) {
            case -1:
                let warningElem = document.getElementById("warning__confirmPassword");
                warningElem.textContent = "Something is wrong on our end. Please try again later!"
                break;
        }
    }
})
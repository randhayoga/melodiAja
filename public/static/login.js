let form = document.getElementById("loginForm")
let button = document.getElementById("loginForm__submit")
button.addEventListener("click", async(e) => {
    e.preventDefault();

    let formIsValid = true;

    // Check if it's fulfilled
    ["username", "password"].forEach((entry) => {
        let elem = document.getElementById(`user__${entry}`)
        let warningElem = document.getElementById(`warning__${entry}`);

        warningElem.textContent = ""
        if (elem.validity.valueMissing) {
            warningElem.textContent = "Please fill out this field"
        }

        formIsValid = formIsValid && !elem.validity.valueMissing;
    })

    const USERNAME = document.getElementById(`user__username`).value;
    const PASSWORD = document.getElementById(`user__password`).value;

    const FORM_DATA = {
        username: USERNAME,
        password: PASSWORD
    };

    let response;
    if (formIsValid) {
        response = await fetch("/auth/login", {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(FORM_DATA)
            })
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                console.log(data.message);
                switch (data.step) {
                    case "username":
                        warningElem = document.getElementById(`warning__username`);
                        warningElem.textContent = data.message;
                        return 0;
                        break;
                    case "password":
                        warningElem = document.getElementById(`warning__password`);
                        warningElem.textContent = data.message;
                        return 0;
                        break;
                    case "success":
                        window.location.replace(data.url);
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
                let warningElem = document.getElementById("warning__password");
                warningElem.textContent = "Failed to establish connection to server"
                break;
        }
    }
})
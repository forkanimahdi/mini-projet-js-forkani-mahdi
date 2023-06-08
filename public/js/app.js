//*  modal
let button = document.querySelectorAll('.button-modal ')
let contenu = document.querySelectorAll(`.contenu`)

let modal1btn = document.querySelector("#modal1")
let modal2btn = document.querySelector("#modal2")
let modal1cntn = document.querySelector(".container1")
let modal2cntn = document.querySelector(".container2")


for (let index = 0; index < button.length; index++) {
    let element = button[index];
    element.addEventListener('click', () => {
        let buttonId = element.getAttribute("id");
        contenu.forEach(element => {
            let contenuId = element.getAttribute("id");
            if (buttonId == contenuId) {
                element.style.display = "block"
                let closeButton = element.querySelector(`.close-button`)
                let xButton = element.querySelector(`.x-button`)
                closeButton.addEventListener("click", () => {
                    element.style.display = "none"
                })
                xButton.addEventListener("click", () => {
                    element.style.display = "none"
                })
            }
        });
    })
}
//* systheme d authentification

//~ sing up
let singupInputs = document.querySelectorAll(".singup-input")
let singupButton = document.getElementById('collect-data')

let usernamesingup = document.querySelector("#username");
let emailsingup = document.querySelector("#emailsingup");
let passwordsingup = document.querySelector("#passwordsingup");
let confirmPasssingup = document.querySelector("#confirmsingup");
let joining = document.querySelector(".joining")

// condition to collect data

let emptyphase = true
let matchedpass = true


//~ login
let loginButton = document.querySelector(".login-button")
let loginInput = document.querySelectorAll(".login-input")

let loginMail = document.querySelector(`#login-mail`);
let loginPassword = document.querySelector(`#login-password`);
let loginLabel = document.querySelector(`.mail-label`);
let passwordLabel = document.querySelector(`.password-label`);
let logintext = document.querySelector(`.lgn-txt`);

// check data 

let checkinfo = true


// check connections

let isConnected = false
let welcoming = document.querySelector(".welcome")

//~log out 
let logoutbtn = document.querySelector(".logoutbtn")


//? for styling  applying functiom with parametre

const movingLabel = (theInput, theLabel) => {
    if (theInput.value != 0) {
        theLabel.style.marginTop = `-6%`
    } else {
        theLabel.style.marginTop = `0%`

    }
}

loginMail.addEventListener("input", () => {
    movingLabel(loginMail, loginLabel)
})
loginPassword.addEventListener("input", () => {
    movingLabel(loginPassword, passwordLabel)
})

singupInputs.forEach(element => {
    element.addEventListener("input", () => {
        let cibledLabel = element.nextElementSibling
        movingLabel(element, cibledLabel)

    })
});

//* make sur no input is empty

singupButton.addEventListener("click", () => {
    singupInputs.forEach(element => {
        if (element.value == 0) {
            element.style.backgroundColor = "red"
            element.value = "Cant be empty"
            element.style.color = "black"
            emptyphase = false
            setTimeout(() => {
                element.style.backgroundColor = ""
                element.value = ""
                element.style.color = ""
                emptyphase = true
            }, 2000);
        }
    });
    collectdata()

})

//*  matching two passwords 

confirmPasssingup.addEventListener("input", () => {
    if (confirmPasssingup.value != passwordsingup.value) {
        confirmPasssingup.style.outline = "2px solid red";
        passwordsingup.style.outline = "2px solid red"
        matchedpass = false
    } else {
        confirmPasssingup.style.outline = "2px solid green";
        passwordsingup.style.outline = "2px solid green"
        matchedpass = true
    }

})



class Users {
    constructor(username, email, password) {
        this.username = username;
        this.email = email
        this.password = password;
    }


}

let allUser = [];
let testy = new Users("d", "d", "d")
allUser.push(testy)

console.log(allUser);


function collectdata() {
    if (matchedpass == true && emptyphase == true) {
        let user = new Users(usernamesingup.value, emailsingup.value, passwordsingup.value)
        singupInputs.forEach(element => {
            element.value = "";
            joining.textContent = 'Account created successfully'
            joining.style.color = "green"
            confirmPasssingup.style.outline = "2px solid #f5deb3b9";
            passwordsingup.style.outline = "2px solid #f5deb3b9 "
            setTimeout(() => {
                joining.textContent = 'Join us'
                joining.style.color = ""
                modal2cntn.style.display = "none"
            }, 5000);
        });
        allUser.push(user)
    }
}


//* Log in  ************************ */

loginButton.addEventListener("click", () => {
    loginInput.forEach(element => {
        if (element.value == 0) {
            element.style.backgroundColor = "red"
            element.value = "Cant be empty"
            element.style.color = "black"
            checkinfo = false
            setTimeout(() => {
                element.style.backgroundColor = ""
                element.value = ""
                element.style.color = ""
                checkinfo = true

            }, 2000);
        }
    });
    loginnow()
})

function loginnow() {
    for (let index = 0; index < allUser.length; index++) {
        let element = allUser[index];
        if (loginMail.value == element.email) {
            if (loginPassword.value == element.password) {
                isConnected = true
                loginPassword.value = "";
                loginMail.value = ""
                connected(element)

            } else {
                logintext.textContent = "password incorect"
                logintext.style.color = "red"

                setTimeout(() => {
                    logintext.textContent = "Login"
                    logintext.style.color = "white"
                }, 3000);
            }
        } else {
            logintext.textContent = "email wrong"
            logintext.style.color = "red"

            setTimeout(() => {
                logintext.textContent = "Login"
                logintext.style.color = "white"
            }, 3000);
        }

    }
}

logoutbtn.addEventListener("click", () => {
    let confirminglogout = confirm("Are you sure you want to log out")
    if (confirminglogout == true) {
        isConnected = false
        connected()
    }
})

function connected(theUser) {
    if (isConnected == true) {
        modal1btn.style.display = "none"
        modal2btn.style.display = "none"
        modal1cntn.style.display = "none"
        modal2cntn.style.display = "none"
        welcoming.textContent = `Hello ${theUser.username} you are connected`
        welcoming.style.display = "initial"
        logoutbtn.style.display = "initial"
    } else {
        modal1btn.style.display = "initial"
        modal2btn.style.display = "initial"
        modal1cntn.style.display = "none"
        modal2cntn.style.display = "none"
        welcoming.style.display = "none"
        logoutbtn.style.display = "none"
    }
}
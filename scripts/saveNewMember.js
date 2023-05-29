import pugBackground from "./pugBackground.js";
import logIn from "./logIn.js";
import User from "./user.js";

export default function saveNewMember() {
    pugBackground();
    let headline = document.createElement("h1");
    headline.id = "newMemberHeadline"; 
    headline.innerText = "NEW MEMBER";
    content.appendChild(headline);
    // LABEL FÖR NYTT USERNAME
    let labelNewUser = document.createElement("Label");
    labelNewUser.id = "labelNewUser";
    labelNewUser.innerText = "New username:";
    content.appendChild(labelNewUser);
    //SKAPAR NY ANVÄNDARE
    let inputCreateUserName = document.createElement("input");
    inputCreateUserName.id = "inputCreateUserName";
    inputCreateUserName.type = "text";
    content.appendChild(inputCreateUserName);
    // LABEL FÖR NYTT LÖSENORD
    let labelNewPassword = document.createElement("Label");
    labelNewPassword.id = "labelNewPassword";
    labelNewPassword.innerText = "New password:";
    content.appendChild(labelNewPassword);
    //SKAPAR NYTT LÖSENORD
    let inputCreatePassword = document.createElement("input");
    inputCreatePassword.id = "inputCreatePassword";
    inputCreatePassword.type = "text";
    content.appendChild(inputCreatePassword);
    //SKAPAR CREATE-KNAPP
    let createBtn = document.createElement("button");
    createBtn.innerText = "Save";
    createBtn.id = "createBtn";
    content.appendChild(createBtn);
    let closeBtn = document.createElement("button");
    closeBtn.innerText = "Close";
    closeBtn.id = "closeBtn";
    content.appendChild(closeBtn);
    closeBtn.addEventListener("click", () => {
        content.innerHTML = "";
        logIn();
    })
    createBtn.addEventListener("click", () => {
        let users;
        if (!localStorage.getItem("users")) {
            users = [];
            localStorage.setItem("users", users);
        } else {
            users = JSON.parse(localStorage.getItem("users"));
        }
        let newUser = new User(inputCreateUserName.value,
            inputCreatePassword.value);
        setTimeout(() => {
            users.users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));
            alert(
                "user has been created and saved to local storage");
        }, 1000);
    })
}


//переменные Регстрация пользователя
const regFullName = document.querySelector("#reg_full_name")
const regLogin = document.querySelector("#reg_login")
const regPassword = document.querySelector("#reg_password")
const regUserBtn = document.querySelector("#reg_user_btn")
//переменные Логин
const logLogin = document.querySelector("#log_login")
const logPassword = document.querySelector("#log_password")
const logUserBtn = document.querySelector("#log_user_btn")


const BASE_URL = "http://localhost:8080";

const fetchData = async (route) => {
    const response = await fetch(BASE_URL + route);
    return await response.json();
};

const postData = async (route, payload) => {
    fetch(
        BASE_URL + route, 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: payload,
        },
    )
    .then(() => console.log("parsed"))
    .catch(() => console.log("Error sending request"));
};


const userRegistration = () =>{
    const userInfoPayload  = {
            fullName: regFullName.value,
            login: regLogin.value,
            password: regPassword.value
    };
    let jsonPaylod = JSON.stringify(userInfoPayload)
    postData("/users", jsonPaylod)
}

regUserBtn.addEventListener("click", userRegistration)
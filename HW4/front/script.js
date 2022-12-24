const usersBlock = document.querySelector(".users_block");
const carsBlock = document.querySelector(".cars_block");
const createUserBtn = document.querySelector("#create_user_btn");
const createCarBtn = document.querySelector("#create_car_btn");
const deleteAllUsersBtn = document.querySelector("#clear_all_users")
const deleteAllCarsBtn = document.querySelector("#clear_all_cars")

BASE_URL = "http://localhost:8080";

//Ифе
const loadData = async () => {
  usersBlock.innerHTML = "";
  carsBlock.innerHTML = "";
  document.querySelector("#new_user_name").value = "";
  document.querySelector("#new_cars_name").value = "";
  const responseUser = await fetch(BASE_URL + "/users");
  const dataUser = await responseUser.json();

  for (const user of dataUser) {
    usersBlock.innerHTML += `
    <p>${user.name}
        <button onclick="deleteUser(${user.id})">Delete</button>
    </p>
    `;
  }
  const responseCar = await fetch(BASE_URL + "/cars");
  const dataCar = await responseCar.json();

  for (const cars of dataCar) {
    carsBlock.innerHTML += `<p>${cars.model}<button onclick="deleteCar(${cars.id})">Delete</button></p>`;
  }
};

loadData();

createUserBtn.addEventListener("click", () => {
  const newUserName = document.querySelector("#new_user_name").value;
  let payload = {
    name: newUserName,
  };

  fetch(BASE_URL + "/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(payload),
  })
    .then(() => alert("User added!"))
    .then(() => {
      loadData();
    })
    .catch(() => alert("User create error"));
});

createCarBtn.addEventListener("click", () => {
  const newCarName = document.querySelector("#new_cars_name").value;
  let payload = {
    model: newCarName,
  };

  fetch(BASE_URL + "/cars", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(payload),
  })
    .then(() => alert("Car added!"))
    .then(() => {
      loadData();
    })
    .catch(() => alert("Car create error"));
});
//Функции удаления пользователя и юзера
const deleteUser = (id) => {
  fetch(BASE_URL + "/users/" + id, { method: "Delete" })
    .then(() => alert("User deleted!"))
    .then(() => {
      loadData();
    })
    .catch(() => alert("User delete error"));
};

const deleteCar = (id) => {
  fetch(BASE_URL + "/cars/" + id, { method: "delete" })
    .then(() => alert("car deleted!"))
    .then(() => {
      loadData();
    })
    .catch(() => alert("car delete error"));
};





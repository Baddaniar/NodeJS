const carsBlock = document.querySelector(".cars_block");
const createCarBtn = document.querySelector("#create_car_btn");

BASE_URL = "http://localhost:8080";

//Ифе
const loadData = async () => {
  carsBlock.innerHTML = "";
  document.querySelector("#new_cars_name").value = "";

  const responseCar = await fetch(BASE_URL + "/cars");
  const dataCar = await responseCar.json();

  for (const cars of dataCar) {
    carsBlock.innerHTML += `<p>${cars.model}</p>`;
  }
};

loadData();


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

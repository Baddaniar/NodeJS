const carsList = document.querySelector("#carsList")

const loadData = async () => {
    const responseCar = await fetch(BASE_URL + "/cars");
    const dataCar = await responseCar.json();
    for (const cars of dataCar) {
      carsList.innerHTML += `<li>${cars.model}</li>`;
    }
  };
  
  loadData();
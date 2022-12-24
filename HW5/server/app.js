const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const fs = require("fs")
const cors = require("cors");

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: "false" }));


// //Получение файла из папки public
// app.use("/static", express.static(__dirname +`/public`))

// let usersArray = [
//     { id: 1, department: "IT", name: "Daniar" },
//     { id: 2, department: "Audit", name: "Aslan" },
// ];

// //GET запросы
// app.get("/users", (req, res) => {
//     res.send(usersArray);
// });

// app.get("/users/:id", (req, res) => {
//     const { id } = req.params;
//     res.send(usersArray.find((item) => item.id === +id));
// });

// app.get("/users/department/:name", (req, res) => {
//     const { name } = req.params;
//     res.send(usersArray.filter((item) => item.department === name));
// });

// //POST запросы
// app.post("/users", (req, res) => {
//     const {id, department, name} = req.body
//     usersArray.push({id, department, name})
//     res.status(201).send("ok")
// });

// app.put("/users", (req, res) => {
//     const {id, department, name} = req.body
//     userIndex = usersArray.findIndex(item => item.id === +id)
//     usersArray[userIndex].name = name
//     usersArray[userIndex].department = department
//     res.status(201).send("ok")
// });


//Задачка

app.get("/cars", (req, res) =>{
    console.log("Cars router")
    res.send(fs.readFileSync("./cars.json", {encoding: "utf-8"}));
});

app.post("/cars", (req, res) =>{
    const carsArray = JSON.parse(fs.readFileSync("./cars.json", {encoding: "utf-8"}))
    fs.writeFileSync("./cars.json", JSON.stringify([...carsArray, {id: carsArray.at(-1)?.id + 1 || 1, model: req.body.model}]));
    res.send("cars added");
});

app.put("/cars", (req, res) =>{
    const {id, model} = res.body
    let carsArray = JSON.parse(fs.readFileSync("./cars.json", {encoding: "utf-8"}))
    carsIndex = carsArray.findIndex(item => item.id === +id)
    carsArray[carsIndex].model = model
    fs.writeFileSync("./cars.json", JSON.stringify(carsArray));
    res.send("cars changed");
});

app.delete("/cars/:id", (req, res) =>{
    const {id} = req.body
    const carsArray = JSON.parse(fs.readFileSync("./cars.json", {encoding: "utf-8"}))
    const newArrray = carsArray.filter(item => item.id !== +id)
    fs.writeFileSync("./cars.json", JSON.stringify(newArrray));
    res.send("cars deleted");
});


app.listen(8080);

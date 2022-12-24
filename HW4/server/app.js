const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRouter = require("./routers/usersRouter.js");
const carsRouter = require("./routers/carsRouter.js");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "false" }));

app.use("/users", (req, res, next) => {
  if (5 > 2) {
    next();
  } else {
    res.send("У вас нет доступа");
  }
});

app.use("/users", userRouter);
app.use("/cars", carsRouter);

//Функции были экспортированы в файлик router/carsRoutee.js
// app.get("/cars", (req, res) =>{
//     res.send(fs.readFileSync("cars.json", {encoding: "utf-8"}));
// });

// app.post("/cars", (req, res) =>{
//     console.log(req.body)
//     const carsArray = JSON.parse(fs.readFileSync("./cars.json", {encoding: "utf-8"}))
//     fs.writeFileSync("cars.json", JSON.stringify([...carsArray, {id: carsArray.length+1, model: req.body.model}]));
//     res.send("cars added");
// });

//Функции были экспортированы в файлик router/userRouter
// app.get("/users", (req, res) =>{
//     console.log
//     res.send("user endpoint")
// });

// app.post("/users", (req, res) =>{
//     const userArray = JSON.parse(fs.readFileSync("./users.json", {encoding: "utf-8"}))
//     fs.writeFileSync("users.json", JSON.stringify([...userArray, {id: userArray.length+1, name: req.body.name}]));
//     res.send("user added")
// });

app.listen(8080, () => {
  console.log("Server start");
});

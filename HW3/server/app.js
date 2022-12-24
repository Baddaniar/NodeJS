const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "false" }));


app.get("/cars", (req, res) =>{
    res.send(fs.readFileSync("cars.json", {encoding: "utf-8"}));
});

app.post("/cars", (req, res) =>{
    console.log(req.body)
    const carsArray = JSON.parse(fs.readFileSync("./cars.json", {encoding: "utf-8"}))
    fs.writeFileSync("cars.json", JSON.stringify([...carsArray, {id: carsArray.length+1, model: req.body.model}]));
    res.send("cars added");
});


app.listen(8080, () => {
  console.log("Server start");
});

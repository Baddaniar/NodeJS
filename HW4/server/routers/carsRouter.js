const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res) =>{
    console.log("Cars router")
    res.send(fs.readFileSync("./routers/cars.json", {encoding: "utf-8"}));
});

router.get("/:id", (req, res) =>{
    const id = +req.params.id;
    const carsArray = JSON.parse(fs.readFileSync("./routers/cars.json", {encoding: "utf-8"}))
    const car = carsArray.find(user => user.id === id)
    res.send(car);
});

router.delete("/all", (req, res) =>{
    const nothing = []
    fs.writeFile("./routers/cars.json", JSON.stringify(nothing), (err) =>{console.log(err ? "error!" : "success!");})
    res.send("cars deleted")
});


router.delete("/:id", (req, res) =>{
    const id = req.params.id;
    if(id === "all"){
        fs.writeFileSync("./routers/cars.json", JSON.stringify(nothing))
        res.send("All cars deleted")
    }else{
        const carsArray = JSON.parse(fs.readFileSync("./routers/cars.json", {encoding: "utf-8"}))
        fs.writeFileSync("./routers/cars.json", JSON.stringify(carsArray.filter(car => car.id !== +id)))
        res.send("car deleted")
    }
});


router.post("/", (req, res) =>{
    const carsArray = JSON.parse(fs.readFileSync("./routers/cars.json", {encoding: "utf-8"}))
    fs.writeFileSync("./routers/cars.json", JSON.stringify([...carsArray, {id: carsArray.at(-1)?.id + 1 || 1, model: req.body.model}]));
    res.send("cars added");
});


module.exports = router;
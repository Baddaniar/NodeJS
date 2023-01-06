const express = require("express");
const app = express();
const fs = require("fs")
const bodyParser = require("body-parser")

app.set("view engine","hbs");
app.use("/static", express.static(__dirname + "/public"))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.post("/pages", (req, res) =>{
    const pagesArray = JSON.parse(fs.readFileSync("./pages.json", {encoding: "utf-8"}))
    fs.writeFileSync("./pages.json", JSON.stringify([...pagesArray, {model: req.body.model, year : req.body.year, img_src: req.body.img_src}]));
    res.send("item added");
});

app.get("/pages", (req,res)=>{
    let pages = JSON.parse(fs.readFileSync("pages.json"));

    res.render("pages.hbs",{
        pages
    })
})


app.listen(8080)
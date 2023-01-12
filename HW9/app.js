const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const phoneRouter = require("./routers/phoneRouter")

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



mongoose.connect(`mongodb+srv://admin:admin@cluster0.ms7n5wb.mongodb.net/?retryWrites=true&w=majority`, (error) =>{
    if(error){
        console.log("ERORR", error)
    }else{
        console.log("server started");
        app.use("/phones", phoneRouter)
        app.listen(8080)
    }
});

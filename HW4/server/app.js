const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRouter = require("./routers/usersRouter.js");
const carsRouter = require("./routers/carsRouter.js");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "false" }));


app.use("/users", userRouter);
app.use("/cars", carsRouter);


app.listen(8080, () => {
  console.log("Server start");
});

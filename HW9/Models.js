const mongoose = require("mongoose");
const { phoneScheme } = require("./Schemas");


const PhoneModel = mongoose.model("Phone", phoneScheme);

module.exports = {
    PhoneModel,
}
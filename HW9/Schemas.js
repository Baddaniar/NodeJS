const { Schema } = require('mongoose');

const phoneScheme = new Schema({
    model: String,
    price: Number,
    color: String,
});

module.exports = {
    phoneScheme,
}
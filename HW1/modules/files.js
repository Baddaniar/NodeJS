const fs = require("fs")

const getFirstWord = function(file){
    let data = fs.readFileSync(file, {encoding: "utf-8"}).split(" ")
    console.log(data[0])
}

const getLastWord = function(file){
    let data = fs.readFileSync(file, {encoding: "utf-8"}).split(" ")
    console.log(data[data.length - 1])
}


module.exports = {getFirstWord, getLastWord}
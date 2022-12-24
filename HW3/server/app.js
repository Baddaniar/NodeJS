const fs = require("fs");
const http = require("http");

function handler(req, res) {
    const carsJSON = fs.readFileSync("cars.json", { encoding: "utf-8" });
    if (req.url === "/cars" && req.method === "GET") {

    } else if (req.url === "/cars" && req.method === "POST") {
        
    }
}

http.createServer(handler).listen(3030);

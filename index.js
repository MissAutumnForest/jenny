var express = require("express");
var app = express();

app.use(express.static(__dirname + "/"));
app.listen(7000);
console.log("Server Listening on port 7000");


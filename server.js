const express = require("express");
const jsonWebToken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.set("jwt-secret", "bNEPp6H70vPo01yGe5lptraU4N9v005y");

var validateToken = function(request, response, next) {};

app.post("/authenticate", function(request, response) {});

app.get("/protected", validateToken, function(request, response) {});

const server = app.listen("3000", function() {
    console.log("Listening on port 3000");
});
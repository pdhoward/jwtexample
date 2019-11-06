const express = require("express");
const jsonWebToken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


// setting a variable used for signing and verifying jwt data
// variable name and value can be whatever you want 
// but should be kept secret

app.set("jwt-secret", "bNEPp6H70vPo01yGe5lptraU4N9v005y");

const validateToken = function(request, response, next) {};

app.post("/authenticate", function(request, response) {

    // example purposes only - this would be stored in a db
    let user = {
        username: "roadtohire",
        password: "$2a$10$LiMweWit2woRvc2IGpSfcuOM23EeRYu5X9f09Fxsw3hUsdLZBoj/q"
    };
    if(!request.body.username) {
        return response.status(401).send({ "success": false, "message": "A `username` is required"});
    } else if(!request.body.password) {
        return response.status(401).send({ "success": false, "message": "A `password` is required"});
    }
    bcrypt.compare(request.body.password, user.password, function(error, result) {
        console.log(result);
        if(error || !result) {
            return response.status(401).send({ "success": false, "message": "Invalid username and password" });
        }
        let token = JsonWebToken.sign(user, app.get("jwt-secret"), {});

        // if username and password are correct, we return jwt token
        response.send({"token": token});
    });
});

app.get("/protected", validateToken, function(request, response) {});

const server = app.listen("3000", function() {
    console.log("Listening on port 3000");
});
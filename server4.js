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

const validateToken = function(request, response, next) {
    var authHeader = request.headers["authorization"];
    if(authHeader) {
        bearerToken = authHeader.split(" ");
        if(bearerToken.length == 2) {
            jsonWebToken.verify(bearerToken[1], app.get("jwt-secret"), function(error, decodedToken) {
                if(error) {
                    return response.status(401).send({ "success": false, "error": "Invalid authorization token" });
                }
                request.decodedToken = decodedToken;
                next();
            });
        }
    } else {
        response.status(401).send({ "success": false, "error": "An authorization header is required" });
    }
};

app.post("/authenticate", function(request, response) {

    // our mock data - username and password
    let user = {
        username: "roadtohire",
        //password: "$2a$10$LiMweWit2woRvc2IGpSfcuOM23EeRYu5X9f09Fxsw3hUsdLZBoj/q"
        password: "password"
    };

    // a password is typically hashed before storing on db
    // so we are going to hash it now for demo purposes
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(user.password, salt);

    if(!request.body.username) {
        return response.status(401).send({ "success": false, "message": "A `username` is required"});
    } else if(!request.body.password) {
        return response.status(401).send({ "success": false, "message": "A `password` is required"});
    }

    // lets console
    console.log(`The password from web is ${request.body.password}`)
    console.log(`The plain text password on our db is ${user.password}`)
    console.log(`The hash of our password on our db is ${hash}`)
    bcrypt.compare(request.body.password, hash, function(error, result) {
        console.log(result);
        if(error || !result) {
            return response.status(401).send({ "success": false, "message": "Invalid username and password" });
        }
        let token = jsonWebToken.sign(user, app.get("jwt-secret"), {});

        // if username and password are correct, we return jwt token
        response.send({"token": token});
    });
});

app.get("/protected", validateToken, function(request, response) {
    response.send({ "message": "Welcome to the protected page" });
});

const server = app.listen("3000", function() {
    console.log("Listening on port 3000");
});
var express = require('express');
let bodyParser = require('body-parser');
const mongoose = require('mongoose');
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//const CLIENT_URL = "http://localhost:3000";
const CLIENT_URL = "https://the-movie-network.herokuapp.com";

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", CLIENT_URL);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.get('/', function (req, res) {
    res.send("Node server running...");
});

app.listen(process.env.PORT);
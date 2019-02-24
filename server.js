let express = require('express');
let bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://' + process.env.DBUSERNAME + ':' + process.env.DBPASSWORD + '@ds249035.mlab.com:49035/tidy');

let app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const CLIENT_URL = "http://localhost:3000";

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

let userService = require('./service/user.service.server');
let taskService = require('./service/task.service.server');
userService(app);
taskService(app);

app.listen(process.env.PORT || 5000);
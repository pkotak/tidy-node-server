module.exports = function (app, nodemailer) {
    app.get('/api/user', findAllUsers);
    app.get('/api/user/:id', findUserById);
    app.get('/api/user/group/:group', findUserByGroup);
    app.get('/api/user/username/:username', findByUserName);
    app.get('/api/email', sendEmail)
    app.post('/api/user', createUser);
    app.put('/api/user/:id/task', updateTask);
    app.delete('/api/user/:id', deleteUser)
    let userModel = require('../model/user/user.model.server');
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAILUSERNAME,
            pass: process.env.EMAILPASS
        }
    });

    function sendEmail(req, res) {
        let mailOptions = {
            from: 'team212updates@gmail.com',
            to: 'paarthkotak@gmail.com',
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                res.sendStatus(200);
            }
        });
    }

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function (users) {
                res.send(users);
            })
    }

    function findUserById(req, res) {
        var id = req.params['id'];
        userModel.findUserById(id)
            .then(function (user) {
                res.json(user);
            })
    }

    function findUserByGroup(req, res) {
        var group = req.params['group'];
        userModel.findByGroup(group)
            .then(function (user) {
                res.json(user);
            })
    }

    function findByUserName(req, res) {
        var username = req.params['username'];
        userModel.findByUserName(username)
            .then(function (user) {
                res.json(user);
            })
    }

    function createUser(req, res) {
        var user = req.body;
        userModel.findByUserName(user.username).then(
            response =>{
                if(response===null){
                    userModel.createUser(user)
                        .then(function (user) {
                            res.send(user);
                        })
                }
                else
                {
                    res.sendStatus(500);
                }
            }
        )
    }

    function updateTask(req,res){
        var user = req.body;
        var id = req.params['id'];
        userModel.findUserById(id).then(response => {
            if(response.username===user.username) {
                userModel.updateUser(id,user)
                    .then(response=>
                        res.sendStatus(200)
                    );
            }
            else{
                userModel.findByUserName(user.username).then(response => {
                    if(response===null) {
                        userModel.updateUser(id,user)
                            .then(response=>
                                res.sendStatus(200)
                            );
                    }
                    else{
                        res.sendStatus(500);
                    }})
            }
        })
    }

    function deleteUser(req, res) {
        var id = req.params['id'];
        userModel.deleteUser(id).then(response => {
            res.send(response);
        });
    }
}
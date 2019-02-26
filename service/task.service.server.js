module.exports = function (app) {
    app.get('/api/task', findAllTasks);
    app.get('/api/task/:id', findTaskById);
    app.post('/api/task', createTask);
    app.delete('/api/task/:id', deleteTask)
    app.put('/api/task/:id/complete', markTaskAsComplete)
    let taskModel = require('../model/task/task.model.server');
    let userModel = require('../model/user/user.model.server');

    function findAllTasks(req, res) {
        taskModel.findAllTasks()
            .then(function (tasks) {
                res.send(tasks);
            })
    }

    function findTaskById(req, res) {
        let id = req.params['id'];
        taskModel.findTaskById(id)
            .then(function (task) {
                res.json(task);
            })
    }

    function createTask(req, res) {
        let task = req.body;
        taskModel.findByTaskName(task.name).then(
            response =>{
                if(response===null){
                    taskModel.createTask(task)
                        .then(function (task) {
                            res.send(task);
                        })
                }
                else
                {
                    res.sendStatus(500);
                }
            }
        )
    }

    function deleteTask(req, res) {
        let id = req.params['id'];
        taskModel.deleteTask(id).then(response => {
            res.send(response);
        });
    }

    function markTaskAsComplete(req, res) {
        let id = req.params['id'];
        let user_body = req.body;
        taskModel.findTaskById(id)
            .then(task => {
                userTask(task, user_body, id).then(status => {
                    res.sendStatus(status);
                })

            })
    }

    function userTask(task, user_body, id) {
        return new Promise((resolve) => {
            userModel.findByUserName(user_body.username)
                .then(user => {
                    let match_task = task._id.toString() === user.task.toString();
                    if (user.password === user_body.password && match_task) {
                        task.isComplete = true;
                        taskModel.updateTask(id, task)
                            .then(resolve(200));
                    }
                    else
                        resolve(500);
                })
        });
    }
}


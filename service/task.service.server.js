module.exports = function (app) {
    app.get('/api/task', findAllTasks);
    app.get('/api/task/:id', findTaskById);
    app.post('/api/task', createTask);
    app.delete('/api/task/:id', deleteTask)
}

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
const mongoose = require('mongoose');
const taskSchema = require('./task.schema.server');
const taskModel = mongoose.model('TaskModel', taskSchema);

function findTaskById(taskId) {
    return taskModel.findById(taskId);
}

function createTask(task) {
    return taskModel.create(task);
}


function findAllTasks() {
    return taskModel.find();
}

function updateTask(id, task) {
    return taskModel.updateOne({_id: id},
        task);
}

function findByTaskName(taskname) {
    return taskModel.findOne({taskname: taskname});
}

function deleteTask(id){
    return taskModel.deleteOne({_id:id})
}

var api = {
    createTask: createTask,
    findAllTasks: findAllTasks,
    findTaskById: findTaskById,
    updateTask: updateTask,
    findByTaskName: findByTaskName,
    deleteTask: deleteTask
};

module.exports = api;
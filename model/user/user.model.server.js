const mongoose = require('mongoose');
const userSchema = require('./user.schema.server');
const userModel = mongoose.model('UserModel', userSchema);

function findUserById(userId) {
    return userModel.findById(userId);
}

function createUser(user) {
    return userModel.create(user);
}


function findAllUsers() {
    return userModel.find()
        .populate('task')
        .populate('previous_task');
}

function updateUser(id, user) {
    return userModel.updateOne({_id: id}, user);
}

function findByUserName(username) {
    return userModel.findOne({username: username});
}

function findByGroup(group) {
    return userModel.find({group: group});
}

function deleteUser(id){
    return userModel.deleteOne({_id:id})
}

let api = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    updateUser: updateUser,
    findByUserName: findByUserName,
    findByGroup: findByGroup,
    deleteUser: deleteUser
};

module.exports = api;
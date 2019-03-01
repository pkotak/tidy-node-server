var mongoose  = require('mongoose')

var userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    group: {type: Number, required: true},
    task: {type: mongoose.Schema.Types.ObjectId, ref: 'TaskModel'},
    previous_task: {type: mongoose.Schema.Types.ObjectId, ref: 'TaskModel'},
    email: {type: String}
}, {collection: 'user'});

module.exports = userSchema;
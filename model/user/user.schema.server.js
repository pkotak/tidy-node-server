var mongoose  = require('mongoose')

var userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true}
    // task: {type: mongoose.Schema.Types.ObjectId, ref: 'TaskModel'}
}, {collection: 'user'});

module.exports = userSchema;
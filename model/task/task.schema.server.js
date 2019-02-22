var mongoose  = require('mongoose')

var taskSchema = mongoose.Schema({
    sequence_number: {type: Number, required: true},
    name: {type: String, required: true},
    deadline: {type: Date, default: new Date()},
    isComplete: {type: Boolean, default: false}
}, {collection: 'task'});

module.exports = taskSchema;
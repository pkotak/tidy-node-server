var mongoose  = require('mongoose')

var weekStatusSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
}, {collection: 'week_status'});

module.exports = weekStatusSchema;
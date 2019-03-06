const mongoose = require('mongoose');
const weekStatusSchema = require('./week_status.schema.server');
const weekStatusModel = mongoose.model('WeekModel', weekStatusSchema);

function createWeekStatus(weekStatus) {
    return weekStatusModel.create(weekStatus);
}

function findWeeklyStats(startDate) {
    return weekStatusModel.find()
        .populate('user')
}

let api = {
    createWeekStatus: createWeekStatus,
    findWeeklyStats: findWeeklyStats

};

module.exports = api;

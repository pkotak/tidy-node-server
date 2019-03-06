module.exports = function (app) {
    app.get('/api/week', findWeeklyStatus);
    app.post('/api/week', createWeekStatus);
    let weekStatusModel = require('../model/week_status/week_status.model.server');

    function findWeeklyStatus(req, res) {
        weekStatusModel.findWeeklyStats('x')
            .then(function(result) {
                res.send(result)
            })
    }

    function createWeekStatus(req, res) {
        let weekStatus = req.body;
        weekStatusModel.createWeekStatus(weekStatus)
            .then(result => {
                res.send(result)
            })
    }
}
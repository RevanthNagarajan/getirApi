module.exports = (app) => {
    const records = require('../controllers/records.controller.js');

    // Create a new Note
    app.post('/getRecords',records.findByDateAndCount);

}
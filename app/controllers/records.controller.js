const Record = require('../models/records.model.js');

const roq = {
    "startDate": "2016-01-26",
    "endDate": "2018-02-02",
    "minCount": 200,
    "maxCount": 3000
}
exports.findByDateAndCount = (req, res) => {
    Record.aggregate([
        { 
            $match : { //query today up to tonight
                createdAt: {
                    $gte: new Date(roq.startDate), 
                    $lt: new Date(roq.endDate)
                }
            },
        },{
            "$addFields": {
                "total": {
                  "$reduce": {
                     input: "$counts",
                     initialValue: 0,
                     in: { 
                       $add: ["$$value", "$$this"]
                     }
                   }
                }
            }
        }
    ])
    .limit(20)
    .then(records => {
        console.log(records)
        res.send(records.filter(record=> record.total > roq.minCount && record.total < roq.maxCount));
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};
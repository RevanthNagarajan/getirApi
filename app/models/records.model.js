const mongoose = require('mongoose');

const RecordSchema = mongoose.Schema({
    key : String,
    createdAt : Date,
    counts : Array,
    value : String,
}, {
    timestamps: true
});

module.exports = mongoose.model('records', RecordSchema);
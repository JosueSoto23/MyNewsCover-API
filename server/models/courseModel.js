const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const course = new Schema ({
    name: {type: String},
    code: {type: String},
    career: {type: String},
    credits: {type: String}
});

module.exports = mongoose.model("courses", course);
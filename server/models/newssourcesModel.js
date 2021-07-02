const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsSource = new Schema ({
    url: {type: String},
    nameSource: {type: String},
    categoryID: {type: Number},
    userID: {type: Number}
});

module.exports = mongoose.model("newsSources", newsSource);

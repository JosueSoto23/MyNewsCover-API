const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsSource = new Schema ({
    url: {type: String},
    nameSource: {type: String},
    categoryID: {type: String},
    userID: {type: String}
});

module.exports = mongoose.model("newsSources", newsSource);

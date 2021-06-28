const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsSource = new Schema ({
    url: {type: String},
    nameSource: {type: String},
    id_category: {type: Number},
    id_user: {type: Number}
});

module.exports = mongoose.model("newsSources", newsSource);

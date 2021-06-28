const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const category = new Schema ({
    category: {type: String}
});

module.exports = mongoose.model("categories", category);

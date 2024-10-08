const mongoose = require("mongoose");


const SaveDate = new mongoose.Schema({
    content: {
        type: Array,
        required: true,
    },
    title: String,
    description: String,
    data: Number,
    favorit: String,

},
    {
        collection: "SaveDate",
    },);


module.exports = mongoose.model("SaveDate", SaveDate);
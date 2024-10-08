const mongoose = require("mongoose");


const Portrete = new mongoose.Schema({
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
        collection: "Portrete",
    },);


module.exports = mongoose.model("Portrete", Portrete);
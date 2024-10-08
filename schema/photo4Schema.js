const mongoose = require("mongoose");


const SedinteFoto = new mongoose.Schema({
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
        collection: "SedinteFoto",
    },);


module.exports = mongoose.model("SedinteFoto", SedinteFoto);
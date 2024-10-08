const mongoose = require("mongoose");


const FotoFamilie = new mongoose.Schema({
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
        collection: "FotoFamilie",
    },);


module.exports = mongoose.model("FotoFamilie", FotoFamilie);
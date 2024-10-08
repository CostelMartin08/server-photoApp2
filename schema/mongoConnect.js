const mongoose = require('mongoose');
require('dotenv').config();

const uri = `mongodb+srv://ioanursuphotography:${process.env.MONGO_SECRET}@cluster0.e3pgz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conectat la baza de date MongoDB');
    })
    .catch(error => {
        console.error('Eroare la conectarea la baza de date MongoDB:', error);
    });

module.exports = mongoose;

const express = require("express");
const router = express.Router();

const Nunti = require("../schema/photo1Schema");
const Portrete = require("../schema/photo2Schema");
const FotoFamilie = require("../schema/photo3Schema");
const SedinteFoto = require("../schema/photo4Schema");
const SaveDate = require("../schema/photo5Schema");


router.get('/', (req, res) => {

    Promise.all([
        Nunti.find({}).exec(),
        Portrete.find({}).exec(),
        FotoFamilie.find({}).exec(),
        SedinteFoto.find({}).exec(),
        SaveDate.find({}).exec(),
    ])

        .then(([nunti, portrete, fotoFamilie, sedinteFoto, saveDate]) => {

            const collections = [nunti, portrete, fotoFamilie, sedinteFoto, saveDate];

            const iteration = collections
                .filter(collection => collection.length > 0)
                .map(collection => {
                    return {
                        title: collection[0].title,
                        content: collection[0].content[0],
                    };
                });


            iteration.forEach((element) => {
                element.title,
                    element.content
            });

            res.send(iteration);
        })
        .catch((error) => {
            console.error('Eroare:', error);
            res.status(500);
        });
});


module.exports = router    
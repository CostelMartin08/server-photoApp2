const express = require("express");
const router = express.Router();

const Nunti = require("../schema/photo1Schema");
const Portrete = require("../schema/photo2Schema");
const FotoFamilie = require("../schema/photo3Schema");


router.get('/', (req, res) => {

    Promise.all([
        Nunti.find({}).exec(),
        Portrete.find({}).exec(),
        FotoFamilie.find({}).exec(),

    ])

        .then(([nunti, portrete, fotoFamilie]) => {

            const collections = [nunti, portrete, fotoFamilie];

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
const express = require("express");
const router = express.Router();
require('dotenv').config();

const upload = require('../packages/multerConfig');
const Nunti = require("../schema/photo1Schema");
const Portrete = require("../schema/photo2Schema");
const FotoFamilie = require("../schema/photo3Schema");
const SedinteFoto = require("../schema/photo4Schema");
const SaveDate = require("../schema/photo5Schema");

const jwt = require('jsonwebtoken');

const multer = require("multer");

const checkAuthenticated = function (req, res, next) {

    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token.replace(/^"(.*)"$/, '$1'), process.env.JWT_CODE, (err, decoded) => {
        if (err) {
            console.error(err);
            return res.status(403).send('Token invalid sau incorect. Reconecteaza-te!');
        }
        req.user = decoded;
        next();
    });
};


router.get("/:parametruURL", (req, res) => {

    const param = req.params.parametruURL;

    let collection;
    switch (param) {
        case 'nunti':
            collection = Nunti;
            break;
        case 'portrete':
            collection = Portrete;
            break;
        case 'fotografii-de-familie':
            collection = FotoFamilie;
            break;
        case 'sedinte-foto':
            collection = SedinteFoto;
            break;
        case 'save-the-date':
            collection = SaveDate;
            break;
        default:
            res.status(404).send({ error: 'Categorie Invalida' });
            return;
    }

    collection.find()
        .then((gallery) => {
            if (gallery) {

                const selectedFields = gallery.map((item) => {

                    return {
                        _id: item._id,
                        title: item.title,
                        data: item.data,
                        favorit: item.favorit,
                        content: item.content[0]
                    }
                });


                res.send(selectedFields);

            } else {
                res.status(404).send({ error: 'Nu s-au gasit evenimentele!' });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500);
        });
});


router.get("/:even/:title", (req, res) => {

    const eveniment = req.params.even;
    const title = req.params.title;

    let collection;
    switch (eveniment) {
        case 'nunti':
            collection = Nunti;
            break;
        case 'portrete':
            collection = Portrete;
            break;
        case 'fotografii-de-familie':
            collection = FotoFamilie;
            break;
        case 'sedinte-foto':
            collection = SedinteFoto;
            break;
        case 'save-the-date':
            collection = SaveDate;
            break;
        default:
            res.status(404).send({ error: 'Categorie Invalida' });
            return;
    }


    collection.findOne({ title: title })
        .then((document) => {
            if (document) {
                res.send(document);
            } else {
                res.status(404).send({ error: 'Titlul cautat nu exista in DB!' });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500);
        });

});

router.post("/", checkAuthenticated, upload.fields([
    { name: 'nunti', maxCount: 100 },
    { name: 'portrete', maxCount: 100 },
    { name: 'fotografii-de-familie', maxCount: 100 },
    { name: 'sedinte-foto', maxCount: 100 },
    { name: 'save-the-date', maxCount: 100 }
]), async (req, res) => { 

    const category = req.body.select;
    const fav = req.body.favorite;
    const time = Date.now();
    const modelMap = {
        nunti: Nunti,
        portrete: Portrete,
        'fotografii-de-familie': FotoFamilie,
        'sedinte-foto': SedinteFoto,
        'save-the-date': SaveDate
    };

    const filtredData = getFilteredData(req.files[category]);

    if (modelMap[category]) {
        
        const existingEntry = await modelMap[category].findOne({ title: req.body.text });

        if (existingEntry) {
          
            return res.status(400).send({ error: 'Titlul există deja pentru această categorie.' });
        }

        const newEntry = new modelMap[category]({
            content: filtredData,
            title: req.body.text,
            description: req.body.textArea,
            data: time,
            favorit: fav,
        });

        try {
            await newEntry.save();
            res.sendStatus(200);
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    } else {
        res.status(404).send({ error: 'Categorie Invalida' });
    }
});


function getFilteredData(files) {
    const data = [];
    if (Array.isArray(files)) {
        files.forEach((file) => data.push(file.generatedName)); 
    } else if (files) {
        data.push(files.generatedName); 
    }
    return data;
}

router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
       
        return res.status(400).send({ error: err.message })

    } else if (err) {

        return res.status(400).send({ error: err.message });
    }
    next();
});
module.exports = router;

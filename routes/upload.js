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

]), (req, res) => {

    const filtredData = [];
    const category = req.body.select;
    const fav = req.body.favorite;
    const time = Date.now();

    switch (category) {

        case 'nunti':
            if (Array.isArray(req.files['nunti'])) {
                req.files['nunti'].forEach((element) => filtredData.push(element.originalname));
            } else if (req.files['nunti']) {
                filtredData.push(req.files['nunti'].originalname);
            }

            const newNunta = new Nunti({
                content: filtredData,
                title: req.body.text,
                description: req.body.textArea,
                data: time,
                favorit: fav,
            });

            Nunti.create(newNunta)
                .then((createdNunta) => {
                    res.sendStatus(200);
                })
                .catch((error) => {
                    res.sendStatus(500);
                    console.error(error);
                });
            break;

        case 'portrete':

            if (Array.isArray(req.files['portrete'])) {
                req.files['portrete'].forEach((element) => filtredData.push(element.originalname));
            } else if (req.files['portrete']) {
                filtredData.push(req.files['portrete'].originalname);
            }
            const newPortrete = new Portrete({
                content: filtredData,
                title: req.body.text,
                description: req.body.textArea,
                data: time,
                favorit: fav,
            });
            Portrete.create(newPortrete)
                .then((createdPortrete) => {
                    res.sendStatus(200);
                })
                .catch((error) => {
                    res.sendStatus(500);
                    console.error(error);
                });
            break;

        case 'fotografii-de-familie':

            if (Array.isArray(req.files['fotografii-de-familie'])) {
                req.files['fotografii-de-familie'].forEach((element) => filtredData.push(element.originalname));
            } else if (req.files['fotografii-de-familie']) {
                filtredData.push(req.files['fotografii-de-familie'].originalname);
            }

            const newFotoFamilie = new FotoFamilie({
                content: filtredData,
                title: req.body.text,
                description: req.body.textArea,
                data: time,
                favorit: fav,
            });
            FotoFamilie.create(newFotoFamilie)
                .then((createdFotoFamilie) => {
                    res.sendStatus(200);
                })
                .catch((error) => {
                    res.sendStatus(500);
                    console.error(error);
                });
            break;

        case 'sedinte-foto':

            if (Array.isArray(req.files['sedinte-foto'])) {
                req.files['sedinte-foto'].forEach((element) => filtredData.push(element.originalname));
            } else if (req.files['sedinte-foto']) {
                filtredData.push(req.files['sedinte-foto'].originalname);
            }

            const newSedinteFoto = new SedinteFoto({
                content: filtredData,
                title: req.body.text,
                description: req.body.textArea,
                data: time,
                favorit: fav,
            });
            SedinteFoto.create(newSedinteFoto)
                .then((createdSedinteFoto) => {
                    res.sendStatus(200);
                })
                .catch((error) => {
                    res.sendStatus(500);
                    console.error(error);
                });
            break;

        case 'save-the-date':

            if (Array.isArray(req.files['save-the-date'])) {
                req.files['save-the-date'].forEach((element) => filtredData.push(element.originalname));
            } else if (req.files['save-the-date']) {
                filtredData.push(req.files['save-the-date'].originalname);
            }

            const newSaveDate = new SaveDate({
                content: filtredData,
                title: req.body.text,
                description: req.body.textArea,
                data: time,
                favorit: fav,
            });
            SaveDate.create(newSaveDate)
                .then((createdSaveDate) => {
                    res.sendStatus(200);
                })
                .catch((error) => {
                    res.sendStatus(500);
                    console.error(error);
                });
            break;

        default:
            res.status(404).send({ error: 'Categorie Invalida' });
    }

});


module.exports = router    

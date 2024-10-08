const express = require("express");
const router = express.Router();
require('dotenv').config();

const uploadMiddleware = require('../packages/multerConfig.v2');
const jwt = require('jsonwebtoken');

const Nunti = require("../schema/photo1Schema");
const Portrete = require("../schema/photo2Schema");
const FotoFamilie = require("../schema/photo3Schema");
const SedinteFoto = require("../schema/photo4Schema");
const SaveDate = require("../schema/photo5Schema");

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


router.put("/:category/:title/:id", checkAuthenticated, (req, res, next) => {

    uploadMiddleware({ title: req.params.title, category: req.params.category })(req, res, next);

}, async (req, res) => {


    let collection;
    const category = req.params.category;

    switch (category) {
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

    try {

        const uploadedFiles = req.file;
        const id = req.params.id;
        let filtredData = uploadedFiles.originalname;

        const filter = { _id: id };
        const update = { $push: { content: filtredData } };

        let upd = await collection.findOneAndUpdate(filter, update, { new: true });


        res.status(200).send('Datele au fost procesate cu succes.');

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});



module.exports = router    
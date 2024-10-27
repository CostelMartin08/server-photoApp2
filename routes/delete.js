const express = require("express");
const router = express.Router();
require('dotenv').config();

const Nunti = require("../schema/photo1Schema");
const Portrete = require("../schema/photo2Schema");
const FotoFamilie = require("../schema/photo3Schema");
const SedinteFoto = require("../schema/photo4Schema");
const SaveDate = require("../schema/photo5Schema");

const jwt = require('jsonwebtoken');
const fs = require('fs');

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

router.delete('/onePhoto', checkAuthenticated, async (req, res) => {

  try {

    const { category, title, param } = req.query;

    let collection;

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

    const filter = { title: title };
    const update = { $pull: { content: param } };

    const upd = await collection.findOneAndUpdate(filter, update, { new: true });

    if (!upd) {
      res.status(404).send({ error: 'Fotografia nu a fost gasită' });
      return;
    }

    res.status(200).send('Fotografie ștearsă!');


    const file = `./public/uploads/${collection.modelName}/${title}/${param}`;

    fs.unlink(file, (err) => {
      if (err) {
        console.error('Eroare la ștergerea fișierului:', err);
        return;
      }

      console.log('Fișierul a fost șters cu succes!');
    });

  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }

});


router.delete('/:category/:id', checkAuthenticated, (req, res) => {

  const param = req.params.category;
  const id = req.params.id;

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

  const query = { _id: id };

  collection.deleteOne(query)
    .then((result) => {
      if (result.deletedCount > 0) {
        res.send({ message: 'Evenimentul a fost sters din DB!' });
      } else {
        res.status(404).send({ error: 'Evenimentul nu a fost gasit in DB!' });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
    });
});

module.exports = router;
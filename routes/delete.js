const express = require("express");
const router = express.Router();
require('dotenv').config();
const path = require('path');

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

    function transformCategory(value) {
      switch (value) {
        case "FotoFamilie":
          return "fotografii-de-familie";
        case "Portrete":
          return "portrete";
        case "Nunti":
          return "nunti"
        case "SaveDate":
          return "save-the-date"
        case "SedinteFoto":
          return "sedinte-foto"
        default:
          return value;
      }
    }

    const file = `./public/uploads/${transformCategory(collection.modelName)}/${title}/${param}`;

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

async function archiveFolder(folderPath) {
  const archivePath = path.join(path.dirname(folderPath), `arhiva_${path.basename(folderPath)}`);
  try {
    fs.renameSync(folderPath, archivePath);
    console.log(`Folderul a fost redenumit: ${archivePath}`);
  } catch (error) {
    console.error('Eroare la redenumirea folderului:', error);
    throw error;
  }
}

// Ruta pentru a șterge un eveniment întreg pe baza categoriei și id-ului
router.delete('/:category/:id', checkAuthenticated, async (req, res) => {
  const param = req.params.category;
  const id = req.params.id;
  let collection;

  // Selectăm colecția corespunzătoare categoriei
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

  // Ștergem documentul specificat din colecție
  const query = { _id: id };
  try {
    const result = await collection.deleteOne(query);
    if (result.deletedCount > 0) {
      res.send({ message: 'Evenimentul a fost sters din DB!' });

      // Redenumim folderul asociat colecției
      const folderPath = `./public/uploads/${param}`;
      await archiveFolder(folderPath);

      // Redenumim colecția în baza de date
      await archiveCollection(collection);
    } else {
      res.status(404).send({ error: 'Evenimentul nu a fost gasit in DB!' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Eroare la ștergere!' });
  }
});
module.exports = router;
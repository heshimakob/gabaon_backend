const express = require('express');
const router = express.Router();
const Vole = require('../models/Vole');



const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Dossier où vous souhaitez stocker les fichiers
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Vous pouvez personnaliser le nom si vous le souhaitez
    }
});

const upload = multer({ storage: storage });

// Créer un vol
router.post('/create', async (req, res) => {
    const newVole = new Vole(req.body);
    try {
        const vole = await newVole.save();
        res.json(vole);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// Lister tous les vols
router.get('/', async (req, res) => {
    try {
        const voles = await Vole.find();
        res.json(voles);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// Rechercher un vol
router.get('/search', async (req, res) => {
    const { origin, destination, date } = req.query;
    try {
        const voles = await Vole.find({ origin, destination, date });
        res.json(voles);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const Bagage = require('../models/Bagage');
const QRCode = require('qrcode');

// Récupérer tous les bagages
router.get('/all', async (req, res) => {
    try {
        const bagages = await Bagage.find().populate('reservation'); // Populate si vous voulez aussi récupérer les détails de la réservation
        res.json(bagages);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// Enregistrer les bagages
router.post('/checkin-baggage', async (req, res) => {
    try {
        const { reservationId, poids, dimensions, type } = req.body;
        const reservation = await Reservation.findById(reservationId);

        if (!reservation) {
            return res.status(404).json('Booking not found');
        }

        const newBagage = new Bagage({
            reservation: reservation._id,
            poids,
            dimensions,
            type,
            status: 'enregistrer'
        });

        await newBagage.save();

        // Ajouter le bagage à la réservation
        reservation.bagages.push(newBagage._id);
        await reservation.save();

        res.json(newBagage);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// Générer et imprimer les cartes d'embarquement
router.get('/embarquement-carte/:reservationId', async (req, res) => {
    try {
        const { reservationId } = req.params;
        const reservation = await Reservation.findById(reservationId).populate('vole').populate('user').populate('bagages');

        if (!reservation) {
            return res.status(404).json('Booking not found');
        }

        const embarquementCarte = {
            PNR: reservation.PNR,
            vole: reservation.vole,
            user: reservation.user,
            gate: 'A1',
            seat: '12B',
            bagages: reservation.bagages
        };

        // Génération du QR code
        const qrCodeUrl = await QRCode.toDataURL(JSON.stringify(embarquementCarte));

        res.json({ ...embarquementCarte, qrCodeUrl });
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;

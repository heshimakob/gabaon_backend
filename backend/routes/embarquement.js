const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// Enregistrer les bagages
router.post('/checkin-baggage', async (req, res) => {
    try {
        const { reservationId, baggageInfo } = req.body;
        const reservation = await Reservation.findById(reservationId);

        if (!reservation) {
            return res.status(404).json('Booking not found');
        }

        reservation.baggageInfo = baggageInfo;
        await reservation.save();

        res.json(reservation);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// Générer et imprimer les cartes d'embarquement
router.get('/embarquement-carte/:reservationId', async (req, res) => {
    try {
        const { reservationId } = req.params;
        const reservation = await Reservation.findById(reservationId).populate('vole').populate('user');

        if (!reservation) {
            return res.status(404).json('Booking not found');
        }

        const embarquementCarte = {
            PNR: reservation.PNR,
            vole: reservation.vole,
            user: reservation.user,
            gate: 'A1',
            seat: '12B'
        };

        res.json(embarquementCarte);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const Bagage = require('../models/Bagage');

// Enregistrer les bagages
router.post('/checkin-baggage', async (req, res) => {
    try {
        const { reservationId, weight, dimensions, type } = req.body;
        const reservation = await Reservation.findById(reservationId);

        if (!reservation) {
            return res.status(404).json('Booking not found');
        }

        const newBagage = new Bagage({
            reservation: reservation._id,
            weight,
            dimensions,
            type,
            status: 'checked-in'
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

        res.json(embarquementCarte);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;

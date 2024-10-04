// const express = require('express');
// const router = express.Router();
// const Reservation = require('../models/Reservation');
// const Vole = require('../models/Vole');
// const User = require('../models/User');

// // Créer une réservation
// router.post('/create', async (req, res) => {
//     const { voleId, userId, ticketType } = req.body;

//     try {
//         const vole = await Vole.findById(voleId);
//         const user = await User.findById(userId);

//         if (!vole || !user) {
//             return res.status(404).json('vole ou l utilisateur n pas retrouver');
//         }

//         const newReservation = new Reservation({
//             vole: vole._id,
//             user: user._id,
//             reservationDate: new Date(),
//             status: 'reserver',
//             ticketType,
//             PNR: generatePNR()
//         });

//         await newReservation.save();
//         res.json(newReservation);
//     } catch (err) {
//         res.status(400).json('Error: ' + err);
//     }
// });

// // Générer un PNR unique
// function generatePNR() {
//     return Math.random().toString(36).substr(2, 8).toUpperCase();
// }

// // Mettre à jour le statut d'une réservation
// router.patch('/update-status/:reservationId', async (req, res) => {
//     const { reservationId } = req.params;
//     const { status } = req.body;

//     try {
//         const updatedReservation = await Reservation.findByIdAndUpdate(reservationId, { status }, { new: true });
//         res.json(updatedReservation);
//     } catch (err) {
//         res.status(400).json('Error: ' + err);
//     }
// });
// router.get('/all', async (req, res) => {
//   try {
//       const reservations = await Reservation.find().populate('vole').populate('user');
//       res.json(reservations);
//   } catch (err) {
//       res.status(500).json({ error: err.message });
//   }
// });

// // Générer un billet électronique
// router.get('/ticket/:reservationId', async (req, res) => {
//     const { reservationId } = req.params;

//     try {
//         const reservation = await Reservation.findById(reservationId).populate('vole').populate('user');

//         if (!reservation) {
//             return res.status(404).json('Reservation not found');
//         }

//         const ticket = {
//             PNR: reservation.PNR,
//             vole: reservation.vole,
//             user: reservation.user,
//             status: reservation.status,
//             ticketType: reservation.ticketType
//         };

//         res.json(ticket);
//     } catch (err) {
//         res.status(400).json('Error: ' + err);
//     }
// });


// router.get('/status/:reservationId', async (req, res) => {
//   const { reservationId } = req.params;

//   try {
//       const reservation = await Reservation.findById(reservationId).populate('vole').populate('user');

//       if (!reservation) {
//           return res.status(404).json('Reservation non trouvée');
//       }

//       res.json({ status: reservation.status });
//   } catch (err) {
//       res.status(400).json('Error: ' + err);
//   }
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');
const cron = require('node-cron');
const Reservation = require('../models/Reservation');
const Vole = require('../models/Vole');
const User = require('../models/User');
// Créer une réservation
const transporter = require('../config/emailConfig');

// Créer une réservation
router.post('/create', async (req, res) => {
    const { name, email, voleId, ticketType, ticket } = req.body;

    try {
        const vole = await Vole.findById(voleId);
        if (!vole) {
            return res.status(404).json('Vole non trouvé');
        }

        const newReservation = new Reservation({
            name,
            email,
            vole: vole._id,
            bookingDate: new Date(),
            status: 'reserver',
            ticketType,
            ticket,
            PNR: generatePNR()
        });

        await newReservation.save();

        // Envoyer un email de confirmation
        const mailOptions = {
            from: 'heshimakob@gmail.com',
            to: email,
            subject: 'Confirmation de Réservation',
            text: `Bonjour ${name},\n\nVotre réservation a été confirmée. Voici les détails:\n\nPNR: ${newReservation.PNR}\nVol: ${voleId}\nType de billet: ${ticketType}\n\nMerci pour votre réservation.\n\nCordialement,\nL'équipe de réservation`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Erreur lors de l\'envoi de l\'email:', error);
            } else {
                console.log('Email envoyé: ' + info.response);
            }
        });

        res.json(newReservation);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// Générer un PNR unique
function generatePNR() {
    return Math.random().toString(36).substr(2, 8).toUpperCase();
}


// Vérifier le statut d'une réservation
router.get('/status/:reservationId', async (req, res) => {
    const { reservationId } = req.params;

    try {
        const reservation = await Reservation.findById(reservationId).populate('vole').populate('user');

        if (!reservation) {
            return res.status(404).json('Reservation non trouvée');
        }

        res.json({ status: reservation.status });
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});
router.get('/all', async (req, res) => {
  try {
      const reservations = await Reservation.find().populate('vole').populate('user');
      res.json(reservations);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});


// Générer un billet électronique
// Générer un billet électronique avec QR code
router.get('/ticket/:reservationId', async (req, res) => {
    const { reservationId } = req.params;

    try {
        const reservation = await Reservation.findById(reservationId).populate('vole').populate('user');

        if (!reservation) {
            return res.status(404).json('Reservation not found');
        }

        const ticket = {
            PNR: reservation.PNR,
            vole: reservation.vole,
            name:reservation.name,
            email:reservation.email,
            user: reservation.user,
            status: reservation.status,
            ticketType: reservation.ticketType
        };

        // Générer le QR code
        const qrCodeData = await QRCode.toDataURL(JSON.stringify(ticket));

        res.json({ ticket, qrCode: qrCodeData });
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

router.patch('/update-status/:reservationId', async (req, res) => {
    const { reservationId } = req.params;
    const { status } = req.body;

    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(reservationId, { status }, { new: true });
        res.json(updatedReservation);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// Planifier une tâche cron pour annuler les réservations après 24 heures
cron.schedule('0 * * * *', async () => {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    try {
        const reservationsToCancel = await Reservation.find({
            reservationDate: { $lt: twentyFourHoursAgo },
            status: 'reserver'
        });

        for (const reservation of reservationsToCancel) {
            reservation.status = 'annule';
            await reservation.save();
        }
        console.log(`Annulé ${reservationsToCancel.length} réservations dépassant 24 heures.`);
    } catch (err) {
        console.error('Erreur lors de l\'annulation des réservations: ', err);
    }
});


module.exports = router;


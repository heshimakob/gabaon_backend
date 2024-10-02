// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');
// const User = require('../models/User');
// const Reservation = require('../models/Reservation');

// // Ajouter un utilisateur
// router.post('/create', async (req, res) => {
//     const { name, email, password, role } = req.body;

//     try {
//         const user = new User({ name, email, password, role });
//         await user.save();
//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// });

// // Changer le rôle d'un utilisateur
// // router.patch('/update-role/:userId', async (req, res) => {
// //     const { userId } = req.params;
// //     const { role } = req.body;

// //     try {
// //         const updatedUser = await User.findByIdAndUpdate(userId, { role }, { new: true });
// //         res.json(updatedUser);
// //     } catch (err) {
// //         res.status(400).json('Error: ' + err);
// //     }
// // });

// router.patch('/update-role/:userId', async (req, res) => {
//   const { userId } = req.params;
//   const { role } = req.body;

//   // Vérification si userId est un ObjectId valide
//   if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json('Invalid user ID');
//   }

//   try {
//       const updatedUser = await User.findByIdAndUpdate(userId, { role }, { new: true });
//       if (!updatedUser) {
//           return res.status(404).json('User not found');
//       }
//       res.json(updatedUser);
//   } catch (err) {
//       res.status(400).json('Error: ' + err.message);
//   }
// });

// // Générer le manifeste des vols
// router.get('/manifest/:flightId', async (req, res) => {
//     const { flightId } = req.params;

//     try {
//         const manifest = await Reservation.find({ flight: flightId }).populate('user', 'name email');
//         if (!manifest) {
//             return res.status(404).json('No reservation found for this flight');
//         }
//         res.json(manifest);
//     } catch (err) {
//         res.status(400).json('Error: ' + err);
//     }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Reservation = require('../models/Reservation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');






// Route pour enregistrer un nouvel utilisateur
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const user = new User({ name, email, password, role});
        await user.save();
        res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Route pour connecter un utilisateur
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Identifiants invalides' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Identifiants invalides' });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, 'secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route pour changer le rôle d'un utilisateur
router.patch('/update-role/:userId', async (req, res) => {
    const { userId } = req.params;
    const { role } = req.body;

    // Vérification si userId est un ObjectId valide
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json('ID utilisateur invalide');
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { role }, { new: true });
        if (!updatedUser) {
            return res.status(404).json('Utilisateur non trouvé');
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json('Erreur: ' + err.message);
    }
});

router.get('/allUser', async (req, res) => {
  try {
      const users = await User.find();
      res.json(users);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// Route pour générer le manifeste des vols
router.get('/manifest/:voleId', async (req, res) => {
    const { voleId } = req.params;

    try {
        const manifest = await Reservation.find({ vole: voleId }).populate('user', 'name email');
        if (!manifest) {
            return res.status(404).json('Aucune réservation trouvée pour ce vol');
        }
        res.json(manifest);
    } catch (err) {
        res.status(400).json('Erreur: ' + err.message);
    }
});

module.exports = router;


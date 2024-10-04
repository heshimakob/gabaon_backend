const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Reservation = require('../models/Reservation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    'your_jwt_secret',
    { expiresIn: '1d' }
  );
};

// Middleware d'authentification
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send({ message: 'Aucun token fourni.' });
  }

  jwt.verify(token.split(' ')[1], 'your_jwt_secret', (err, user) => {
    if (err) {
      return res.status(401).send({ message: 'Token invalide.' });
    }
    req.user = user;
    next();
  });
};

// Route pour enregistrer un nouvel utilisateur
router.post('/register', async (req, res) => {
  const { name, email, password, role, genre, numero ,isAdmin} = req.body;

  // Vérification de la présence des données
  if (!password) {
    return res.status(400).json({ message: 'Le mot de passe est requis.' });
}

// Vérifier si l'adresse mail est déjà utilisée
const existingUser = await User.findOne({ email });
if (existingUser) {
    return res.status(400).json({ message: 'Adresse mail déjà utilisée' });
}

try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Créer un nouvel utilisateur, en ajoutant le chemin de l'image si elle existe
    const newUser = new User({
        name,
        email,
        genre,
        isAdmin,
        numero,
        password: hashedPassword,
      
    });

    await newUser.save();

    res.status(200).json({ success: true, message: 'Successfully registered' });
} catch (error) {
    res.status(400).json({ message: error.message });
}
});

router.get('/userDetail', authMiddleware, async (req, res) => {
  try {
      const user = await User.findById(req.user.id).select('-password'); // Ne pas retourner le mot de passe
      if (!user) {
          return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }

      // Assurez-vous que le chemin de l'image est correct
      user.image = `${req.protocol}://${req.get('host')}/${user.image}`;

      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Route pour connecter un utilisateur
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user);
    res.json({ token, isAdmin: user.isAdmin });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
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

// Route pour obtenir tous les utilisateurs
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

router.post('/logout', async (req, res) => {
  // Si vous utilisez un mécanisme de stockage de session, supprimez le token ici
  // Par exemple, la suppression du token du client peut suffire.
  
  res.status(200).json({ message: 'Déconnexion réussie.' });
});

module.exports = router;

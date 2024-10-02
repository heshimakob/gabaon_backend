const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoleSchema = new Schema({
    origin: String,
    destination: String,
    heureDepart: Date,
    heureArriver: Date,
    date: Date,
    typeAvion: String,
    capacite: Number,
    prix: Number,
});

module.exports = mongoose.model('Vole', VoleSchema);

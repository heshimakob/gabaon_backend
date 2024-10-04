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
    poidEco: Number,
    poidFirst: Number,
    poidsBusiness: Number,
    fareEco:Number,
    fareFirst:Number,
    fareBusiness:Number,
    taxeTouristique:Number,
    rqTaxe:Number,
    rsTaxe:Number,
    rvTaxe:Number,
    tvTaxe:Number,
    prix: Number,
});

module.exports = mongoose.model('Vole', VoleSchema);

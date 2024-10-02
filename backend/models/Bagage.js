const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BagageSchema = new Schema({
    reservation: { type: Schema.Types.ObjectId, ref: 'Reservation' },
    poids: Number,
    dimensions: String,
    type: { type: String, enum: ['bagage main', 'verifier'] },
    status: { type: String, enum: ['enregistrer', 'chargee', 'perdu', 'trouver'] },
    checkInDate: { type: Date, default: Date.now },
    
});

module.exports = mongoose.model('Bagage', BagageSchema);
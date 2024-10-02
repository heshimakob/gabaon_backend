const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BagageSchema = new Schema({
    reservation: { type: Schema.Types.ObjectId, ref: 'Reservation' },
    poids: Number,
    dimensions: String,
    type: { type: String, enum: ['carry-on', 'checked'] },
    status: { type: String, enum: ['checked-in', 'loaded', 'lost', 'found'] },
    checkInDate: { type: Date, default: Date.now },
    
});

module.exports = mongoose.model('Bagage', BagageSchema);
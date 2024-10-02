const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    vole: { type: Schema.Types.ObjectId, ref: 'Vole' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    bookingDate: Date,
    status: { type: String, enum: ['reserver', 'payer', 'annuler', 'utiliser'] },
    ticketType: { type: String, enum: ['economie', 'business', 'first'] },
    PNR: String,
    baggageInfo: { type: String, default: '' }
});

module.exports = mongoose.model('Reservation', ReservationSchema);

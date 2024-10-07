// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const ReservationSchema = new Schema({
//     vole: { type: Schema.Types.ObjectId, ref: 'Vole' },
//     user: { type: Schema.Types.ObjectId, ref: 'User' },
//     bookingDate: Date,
//     status: { type: String, enum: ['reserver', 'payer', 'annuler', 'utiliser'] },
//     ticketType: { type: String, enum: ['economie', 'business', 'first'] },
//     PNR: String,
//     baggageInfo: { type: String, default: '' }
// });

// module.exports = mongoose.model('Reservation', ReservationSchema);


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    vole: { type: Schema.Types.ObjectId, ref: 'Vole', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    bookingDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['reserver', 'payer', 'annuler', 'attente','non chaud'] },


    //avec penalite, 72 heure avant vole pas de penalite , le 72 est comptbiliser  les de l'emission du billet
    ticketType: { type: String, enum: ['economie', 'business', 'first'] },
    ticket: { type: String, enum: ['aller-simple', 'aller-retour'] },
    PNR: String,
    bagages: [{ type: Schema.Types.ObjectId, ref: 'Bagage' }]
});

module.exports = mongoose.model('Reservation', ReservationSchema);


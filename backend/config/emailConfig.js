const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail', // ou tout autre service SMTP
    auth: {
        user: 'heshimakob@gmail.com',
        pass: 'tosz ahvm nrwl wxdb'
    }
});

module.exports = transporter;
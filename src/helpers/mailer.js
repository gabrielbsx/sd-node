const mailer = require('nodemailer');

module.exports = async (contact, subject, text, body, head) => {

    const transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'contato.spiritdestiny@gmail.com',
            pass: '*C0nT4T0.SpiriT',
        },
    });

    var mailOptions = {
        from: 'contato.spiritdestiny@gmail.com',
        to: contact,
        subject: `${subject} ✔`,
        text: text,
        html: `
            <html lang="pt">
                <head>
                    <title>Spirit Destiny - ${subject}</title>
                </head>
                <body>
                    <table>
                        <thead>
                            <tr>
                                ${head}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                ${body}
                            </tr>
                        </tbody>
                    </table>
                </body>
            </html>
        `
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            return false;
        } else {
            console.log('Email sent: ' + info.response);
            console.log(info);
            return true;
        }
    });
};
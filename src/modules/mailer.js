const ejs = require("ejs");

const nodemailer = require("nodemailer");
const config = require("../../config/config");

const transporter = nodemailer.createTransport({
    service: config.MAIL_SERVICE,
    host: config.MAIL_HOST,
    port: config.MAIL_PORT,
    secure: config.MAIL_SECURE,
    auth: {
        user: config.MAIL_USER,
        pass: config.MAIL_PASS
    }
});

module.exports = {
    async sendMail(email, template, subject, parameters) {
        const htmlTemplate = await ejs.renderFile(`templates/mail/${template}.ejs`, parameters);
        await transporter.sendMail({
            from: config.MAIL_FROM,
            to: email,
            subject,
            html: htmlTemplate
        }).catch((error) => ({ error }));
        return { sent: true };
    }
};

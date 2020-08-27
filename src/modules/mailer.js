const ejs = require("ejs");

const config = require("../../config/config");
const transporter = require("../../config/mailer");

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

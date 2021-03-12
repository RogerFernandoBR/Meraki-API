// Auth controller basics methods: index, show, store, update, destroy

const mongooseErrorHandler = require("mongoose-error-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const config = require("../../config/config");

const mailer = require("../modules/mailer");

const User = require("../models/userSchema");

module.exports = {

    async registration(req, res) {
        try {
            const user = await User.create(req.body);
            user.password = undefined;

            const token = crypto.randomBytes(3).toString("hex");
            const expiresIn = new Date();
            expiresIn.setHours(expiresIn.getHours() + 1);

            await User.findByIdAndUpdate(user.id, {
                $set: {
                    passwordResetToken: token,
                    passwordResetExpires: expiresIn
                }
            });

            const parameters = {
                MAIN_URL: config.MAIN_URL,
                USER_NAME: user.name.split(" ", 1),
                TOKEN: token
            };
            await mailer.sendMail(req.body.email, "registration-token", "Validação de e-email!", parameters);

            return res.send(user);
        } catch (err) {
            return res.status(400).send(mongooseErrorHandler.set(err));
        }
    },

    async authenticate(req, res) {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).send({ errors: { MongoError: "Dados insuficientes!" } });

        try {
            const user = await User.findOne({ email }).select("+password");
            if (!user) return res.status(400).send({ errors: { MongoError: "Usuário não registrado!" } });

            const validPass = await bcrypt.compare(password, user.password);

            if (!validPass) return res.status(401).send({ errors: { MongoError: "Erro ao autenticar usuário!" } });

            user.password = undefined;

            return res.status(200).json({
                user,
                token: jwt.sign({ user }, config.TOKEN_SECRET, {
                    expiresIn: config.TOKEN_EXPIRES_IN
                })
            });
        } catch (err) {
            return res.status(500).send({ error: "Erro ao autenticar usuário!", err });
        }
    },

    async forgotPassword(req, res) {
        const { email } = req.body;

        if (!email) return res.status(400).send({ errors: { MongoError: "E-mail não informado!" } });

        try {
            const user = await User.findOne({ email });
            if (!user) return res.status(400).send({ errors: { MongoError: "E-mail não cadastrado!" } });

            const token = crypto.randomBytes(3).toString("hex");
            const expiresIn = new Date();
            expiresIn.setHours(expiresIn.getHours() + 1);

            await User.findByIdAndUpdate(user.id, {
                $set: {
                    passwordResetToken: token,
                    passwordResetExpires: expiresIn
                }
            });

            const parameters = {
                MAIN_URL: config.MAIN_URL,
                USER_NAME: user.name.split(" ", 1),
                TOKEN: token
            };

            const sentMail = await mailer.sendMail(email, "password-token", "Redefinição de senha", parameters);
            if (!sentMail.sent) return res.send({ sent: false });
            return res.send({ sent: true });
        } catch (err) {
            return res.status(500).send(mongooseErrorHandler.set(err));
        }
    },

    async resetPassword(req, res) {
        const { email, password, token } = req.body;
        if (!email) return res.status(400).send({ errors: { MongoError: "E-mail não informado!" } });
        if (!password) return res.status(400).send({ errors: { MongoError: "Senha não informada!" } });
        if (!token) return res.status(400).send({ errors: { MongoError: "Token não informado!" } });
        try {
            const user = await await User.findOne({ email }).select("+passwordResetToken +passwordResetExpires");

            if (!user) return res.status(400).send({ errors: { MongoError: "E-mail não cadastrado!" } });

            if (token !== user.passwordResetToken) return res.status(400).send({ errors: { MongoError: "Token inválido!" } });

            const now = new Date();
            if (now > user.passwordResetExpires) return res.status(400).send({ errors: { MongoError: "Token expirado!" } });

            user.password = password;
            user.passwordResetExpires = now;
            await user.save();

            const parameters = {
                MAIN_URL: config.MAIN_URL,
                USER_NAME: user.name.split(" ", 1)
            };

            await mailer.sendMail(email, "reset-password-alert", "A senha de sua conta foi alterada!", parameters);

            return res.send({ success: true });
        } catch (err) {
            return res.status(500).send({ error: "Erro ao autenticar usuário!" });
        }
    }

};

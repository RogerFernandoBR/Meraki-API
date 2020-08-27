// User controller basics methods: index, show, store, update, destroy

const mongooseErrorHandler = require("mongoose-error-handler");
const config = require("../../config/config");
const mailer = require("../modules/mailer");
const User = require("../models/schemas/userSchema");

module.exports = {
    async index(req, res) {
        try {
            const users = await User.find({});
            return res.send(users);
        } catch (err) {
            return res.status(500).send(mongooseErrorHandler.set(err));
        }
    },

    async show(req, res) {
        const { id } = req.params;

        if (!id) return res.status(400).send({ errors: { MongoError: "Dados insuficientes!" } });

        try {
            const user = await User.findById(id);
            if (!user) return res.send({ errors: { MongoError: "Usuário não encontrado!" } });
            return res.send(user);
        } catch (err) {
            return res.status(500).send(mongooseErrorHandler.set(err));
        }
    },

    async store(req, res) {
        try {
            const user = await User.create(req.body);
            user.password = undefined;

            const parameters = {
                MAIN_URL: config.MAIN_URL,
                USER_NAME: user.name.split(" ", 1)
            };

            await mailer.sendMail(req.body.email, "welcome", "Bem vindo ao Meraki!", parameters);

            return res.send(user);
        } catch (err) {
            return res.status(400).send(mongooseErrorHandler.set(err));
        }
    },

    async update(req, res) {
        try {
            let user = await User.findById(req.params.id);
            if (!user) return res.status(400).send({ errors: { MongoError: "Usuário não existe na base!" } });
            user = await User.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, context: "query", new: true });
            return res.send(user);
        } catch (err) {
            return res.status(400).send(mongooseErrorHandler.set(err));
        }
    },

    async destroy(req, res) {
        const { id } = req.params;

        if (!id) return res.status(400).send({ errors: { MongoError: "Dados insuficientes!" } });

        try {
            let user = await User.findById(id);
            if (!user) return res.status(400).send({ errors: { MongoError: "Usuário não existe na base!" } });
            user = await User.findByIdAndDelete(id);
            return res.send({ message: "Usuário excluído!", data: user });
        } catch (err) {
            return res.status(500).send(mongooseErrorHandler.set(err));
        }
    }
};

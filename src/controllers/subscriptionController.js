// Subscription controller basics methods: index, show, store, update, destroy

const mongooseErrorHandler = require("mongoose-error-handler");
const Subscription = require("../models/subscriptionSchema");

module.exports = {
    async index(req, res) {
        try {
            const subscriptions = await Subscription.find({}).populate("user").populate("course").populate("lesson");
            return res.send(subscriptions);
        } catch (err) {
            return res.status(500).send(mongooseErrorHandler.set(err));
        }
    },

    async show(req, res) {
        const { id } = req.params;

        if (!id) return res.status(400).send({ errors: { MongoError: "Dados insuficientes!" } });

        try {
            const subscription = await Subscription.findById(id).populate("user").populate("course").populate("lesson");
            if (!subscription) return res.send({ errors: { MongoError: "Inscrição não encontrada!" } });
            return res.send(subscription);
        } catch (err) {
            return res.status(500).send(mongooseErrorHandler.set(err));
        }
    },

    async store(req, res) {
        try {
            let subscription = await Subscription.create(req.body);
            subscription = await subscription.populate("user").populate("course").populate("lesson").execPopulate();
            subscription.password = undefined;
            return res.status(201).send(subscription);
        } catch (err) {
            return res.status(500).send(mongooseErrorHandler.set(err));
        }
    },

    async update(req, res) {
        try {
            let subscription = await Subscription.findById(req.params.id);
            if (!subscription) return res.status(400).send({ errors: { MongoError: "Inscrição não encontrada!" } });
            subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, context: "query", new: true }).populate("user").populate("course").populate("lesson");
            return res.send(subscription);
        } catch (err) {
            return res.status(500).send(mongooseErrorHandler.set(err));
        }
    },

    async destroy(req, res) {
        const { id } = req.params;

        if (!id) return res.status(400).send({ errors: { MongoError: "Dados insuficientes!" } });

        try {
            let subscription = await Subscription.findById(id);
            if (!subscription) return res.status(400).send({ errors: { MongoError: "Inscrição não encontrada!" } });
            subscription = await Subscription.findByIdAndDelete(id).populate("user").populate("course").populate("lesson");
            return res.send({ message: "Curso excluído!", data: subscription });
        } catch (err) {
            return res.status(500).send(mongooseErrorHandler.set(err));
        }
    }
};

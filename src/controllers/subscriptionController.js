// Subscription controller basics methods: index, show, store, update, destroy

const Subscription = require("../models/subscription");

module.exports = {
    async index(req, res) {
        try {
            const subscriptions = await Subscription.find({}).populate("user").populate("course").populate("lesson");
            return res.send(subscriptions);
        } catch (err) {
            return res.send(err.errors);
        }
    },

    async show(req, res) {
        const { id } = req.params;

        if (!id) return res.send({ error: "Dados insuficientes" });

        try {
            const subscription = await Subscription.findById(id).populate("user").populate("course").populate("lesson");
            if (!subscription) return res.send({ error: "Inscrição não encontrada!" });
            return res.send(subscription);
        } catch (err) {
            return res.send(err.errors);
        }
    },

    async store(req, res) {
        const {
            user, course, lesson, status, currentTime
        } = req.body;

        if (!user || !course || !lesson || !status || !currentTime) return res.send({ error: "Dados insuficientes!" });

        try {
            let subscription = await Subscription.create(req.body);
            subscription = await subscription.populate("user").populate("course").populate("lesson").execPopulate();
            subscription.password = undefined;
            return res.send(subscription);
        } catch (err) {
            return res.send(err.errors);
        }
    },

    async update(req, res) {
        const { id } = req.params;

        if (!id) return res.send({ error: "Dados insuficientes!" });

        try {
            let subscription = await Subscription.findById(id);
            if (!subscription) return res.send({ error: "Inscrição não existe na base!" });
            subscription = await Subscription.findByIdAndUpdate(id, req.body, { new: true }).populate("user").populate("course").populate("lesson");
            return res.send(subscription);
        } catch (err) {
            return res.send(err.errors);
        }
    },

    async destroy(req, res) {
        const { id } = req.params;

        if (!id) return res.send({ error: "Dados insuficientes!" });

        try {
            let subscription = await Subscription.findById(id);
            if (!subscription) return res.send({ error: "Inscrição não existe na base!" });
            subscription = await Subscription.findByIdAndDelete(id).populate("user").populate("course").populate("lesson");
            return res.send({ message: "Curso excluído!", data: subscription });
        } catch (err) {
            return res.send(err.errors);
        }
    }
};

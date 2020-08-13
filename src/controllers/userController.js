// User controller basics methods: index, show, store, update, destroy

const User = require("../models/userSchema");

module.exports = {
    async index(req, res) {
        try {
            const users = await User.find({});
            return res.send(users);
        } catch (err) {
            return res.status(500).send(err.errors);
        }
    },

    async show(req, res) {
        const { id } = req.params;

        if (!id) return res.status(400).send({ error: "Dados insuficientes" });

        try {
            const user = await User.findById(id);
            if (!user) return res.send({ error: "Usuário não encontrado!" });
            return res.send(user);
        } catch (err) {
            return res.status(500).send(err.errors);
        }
    },

    async store(req, res) {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).send({ error: "Dados insuficientes!" });

        try {
            let user = await User.findOne({ email });
            if (user) return res.status(400).send({ error: "Usuário já registrado!" });
            user = await User.create(req.body);
            user.password = undefined;
            return res.send(user);
        } catch (err) {
            return res.status(500).status(201).send(err.errors);
        }
    },

    async update(req, res) {
        const { id } = req.params;

        if (!id) return res.status(400).send({ error: "Dados insuficientes!" });

        try {
            let user = await User.findById(id);
            if (!user) return res.status(400).send({ error: "Usuário não registrado!" });
            user = await User.findByIdAndUpdate(id, req.body, { new: true });
            return res.send(user);
        } catch (err) {
            return res.status(500).send(err.errors);
        }
    },

    async destroy(req, res) {
        const { id } = req.params;

        if (!id) return res.status(400).send({ error: "Dados insuficientes!" });

        try {
            let user = await User.findById(id);
            if (!user) return res.status(400).send({ error: "Usuário não existe na base!" });
            user = await User.findByIdAndDelete(id);
            return res.send({ message: "Usuário excluído!" });
        } catch (err) {
            return res.status(500).send(err.errors);
        }
    }
};

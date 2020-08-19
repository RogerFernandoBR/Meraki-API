// Auth controller basics methods: index, show, store, update, destroy

const bcrypt = require("bcrypt");
const User = require("../models/schemas/userSchema");

module.exports = {

    async logIn(req, res) {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).send({ error: "Dados insuficientes!" });

        try {
            const user = await User.findOne({ email }).select("+password");
            if (!user) return res.status(400).send({ error: "Usuário não registrado!" });

            const validPass = await bcrypt.compare(password, user.password);

            if (!validPass) return res.status(401).send({ error: "Erro ao autenticar usuário!" });

            user.password = undefined;
            return res.send(user);
        } catch (err) {
            return res.status(500).send({ error: "Erro ao buscar usuário!" });
        }
    }

};

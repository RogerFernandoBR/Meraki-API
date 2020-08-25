// Auth controller basics methods: index, show, store, update, destroy

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../../config/config");

const User = require("../models/schemas/userSchema");

module.exports = {

    async store(req, res) {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).send({ error: "Dados insuficientes!" });

        try {
            const user = await User.findOne({ email }).select("+password");
            if (!user) return res.status(400).send({ error: "Usuário não registrado!" });

            const validPass = await bcrypt.compare(password, user.password);

            if (!validPass) return res.status(401).send({ error: "Erro ao autenticar usuário!" });

            user.password = undefined;

            return res.json({
                user,
                token: jwt.sign({ user }, config.TOKEN_SECRET, {
                    expiresIn: config.TOKEN_EXPIRES_IN
                })
            });
        } catch (err) {
            return res.status(500).send({ error: "Erro ao autenticar usuário!" });
        }
    }

};

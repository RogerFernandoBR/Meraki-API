// Auth controller basics methods: index, show, store, update, destroy

const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports = {

    async logIn(req, res) {
        const { email, password } = req.body;

        if (!email || !password) return res.send({ error: "Dados insuficientes!" });

        try {
            const user = await User.findOne({ email }).select("+password");
            if (!user) return res.send({ error: "Usuário não registrado!" });

            const validPass = await bcrypt.compare(password, user.password);

            if (!validPass) return res.send({ error: "Erro ao autenticar usuário!" });

            user.password = undefined;
            return res.send(user);
        } catch (err) {
            return res.send({ error: "Erro ao buscar usuário!" });
        }
    }

};

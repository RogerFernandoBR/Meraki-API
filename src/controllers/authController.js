// Auth controller basics methods: index, show, store, update, destroy

const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = {
    async index(req, res) {

    },

    async show(req, res) {
        const { email, password } = req.body;

        if (!email || !password) return res.send({ error: 'Dados insuficientes!' });

        try {
            const user = await User.findOne({ email }).select('+password');
            if (!user) return res.send({ error: 'Usuário não registrado!' });

            const valid_pass = await bcrypt.compare(password, user.password);

            if (!valid_pass) return res.send({ error: 'Erro ao autenticar usuário!' });

            user.password = undefined;
            return res.send(user);
        }
        catch (err) {
            return res.send({ error: 'Erro ao buscar usuário!' });
        }
    },

    async store(req, res) {

    },

    async update(req, res) {

    },

    async destroy(req, res) {

    }
}
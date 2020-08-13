// Lesson controller basics methods: index, show, store, update, destroy

const Lesson = require("../models/lessonSchema");

module.exports = {
    async index(req, res) {
        try {
            const lessons = await Lesson.find({}).populate("author").populate("course");
            return res.send(lessons);
        } catch (err) {
            return res.status(500).send(err.errors);
        }
    },

    async show(req, res) {
        const { id } = req.params;

        if (!id) return res.status(400).send({ error: "Dados insuficientes" });

        try {
            const lesson = await Lesson.findById(id).populate("author").populate("course");
            if (!lesson) return res.status(400).send({ error: "Aula não encontrada!" });
            return res.send(lesson);
        } catch (err) {
            return res.status(500).send(err.errors);
        }
    },

    async store(req, res) {
        const {
            name, description, sequence, adress, thumbnail, author
        } = req.body;

        if (!name || !description || !sequence || !adress || !thumbnail || !author) return res.status(400).send({ error: "Dados insuficientes!" });

        try {
            let lesson = await Lesson.create(req.body);
            lesson = await lesson.populate("author").populate("course").execPopulate();
            lesson.password = undefined;
            return res.status(201).send(lesson);
        } catch (err) {
            return res.status(500).send(err.errors);
        }
    },

    async update(req, res) {
        const { id } = req.params;

        if (!id) return res.status(400).send({ error: "Dados insuficientes!" });

        try {
            let lesson = await Lesson.findById(id);
            if (!lesson) return res.status(400).send({ error: "Aula não existe na base!" });
            lesson = await Lesson.findByIdAndUpdate(id, req.body, { new: true }).populate("author").populate("course");
            return res.send(lesson);
        } catch (err) {
            return res.status(500).send(err.errors);
        }
    },

    async destroy(req, res) {
        const { id } = req.params;

        if (!id) return res.status(400).send({ error: "Dados insuficientes!" });

        try {
            let lesson = await Lesson.findById(id);
            if (!lesson) return res.status(400).send({ error: "Aula não existe na base!" });
            lesson = await Lesson.findByIdAndDelete(id).populate("author").populate("course");
            return res.send({ message: "Aula excluída!", data: lesson });
        } catch (err) {
            return res.status(500).send(err.errors);
        }
    }
};

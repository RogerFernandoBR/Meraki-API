// Lesson controller basics methods: index, show, store, update, destroy

const mongooseErrorHandler = require("mongoose-error-handler");
const Lesson = require("../models/schemas/lessonSchema");

module.exports = {
    async index(req, res) {
        try {
            const lessons = await Lesson.find({}).populate("author").populate("course");
            return res.send(lessons);
        } catch (err) {
            return res.status(500).send(mongooseErrorHandler.set(err));
        }
    },

    async show(req, res) {
        const { id } = req.params;

        if (!id) return res.status(400).send({ errors: { MongoError: "Dados insuficientes!" } });

        try {
            const lesson = await Lesson.findById(id).populate("author").populate("course");
            if (!lesson) return res.status(400).send({ errors: { MongoError: "Aula não encontrada!" } });
            return res.send(lesson);
        } catch (err) {
            return res.status(500).send(mongooseErrorHandler.set(err));
        }
    },

    async store(req, res) {
        try {
            let lesson = await Lesson.create(req.body);
            lesson = await lesson.populate("author").populate("course").execPopulate();
            lesson.password = undefined;
            return res.status(201).send(lesson);
        } catch (err) {
            return res.status(500).send(mongooseErrorHandler.set(err));
        }
    },

    async update(req, res) {
        try {
            let lesson = await Lesson.findById(req.params.id);
            if (!lesson) return res.status(400).send({ errors: { MongoError: "Aula não encontrada!" } });
            lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, context: "query", new: true }).populate("author").populate("course");
            return res.send(lesson);
        } catch (err) {
            return res.status(500).send(mongooseErrorHandler.set(err));
        }
    },

    async destroy(req, res) {
        const { id } = req.params;

        if (!id) return res.status(400).send({ errors: { MongoError: "Dados insuficientes!" } });

        try {
            let lesson = await Lesson.findById(id);
            if (!lesson) return res.status(400).send({ errors: { MongoError: "Aula não encontrada!" } });
            lesson = await Lesson.findByIdAndDelete(id).populate("author").populate("course");
            return res.send({ message: "Aula excluída!", data: lesson });
        } catch (err) {
            return res.status(500).send(mongooseErrorHandler.set(err));
        }
    }
};

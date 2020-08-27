// Course controller basics methods: index, show, store, update, destroy

const mongooseErrorHandler = require("mongoose-error-handler");
const Course = require("../models/courseSchema");

module.exports = {
    async index(req, res) {
        try {
            const courses = await Course.find({}).populate("author");
            return res.send(courses);
        } catch (err) {
            return res.status(500).send(mongooseErrorHandler.set(err));
        }
    },

    async show(req, res) {
        const { id } = req.params;

        if (!id) return res.status(400).send({ errors: { MongoError: "Dados insuficientes!" } });

        try {
            const course = await Course.findById(id).populate("author");
            if (!course) return res.status(400).send({ errors: { MongoError: "Curso não encontrado!" } });
            return res.send(course);
        } catch (err) {
            return res.status(500).send(mongooseErrorHandler.set(err));
        }
    },

    async store(req, res) {
        try {
            let course = await Course.create(req.body);
            course = await course.populate("author").execPopulate();
            course.password = undefined;
            return res.status(201).send(course);
        } catch (err) {
            return res.status(500).send(mongooseErrorHandler.set(err));
        }
    },

    async update(req, res) {
        try {
            let course = await Course.findById(req.params.id);
            if (!course) return res.status(400).send({ errors: { MongoError: "Curso não encontrado!" } });
            course = await Course.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, context: "query", new: true }).populate("author");
            return res.send(course);
        } catch (err) {
            return res.status(500).send(mongooseErrorHandler.set(err));
        }
    },

    async destroy(req, res) {
        const { id } = req.params;

        if (!id) return res.status(400).send({ errors: { MongoError: "Dados insuficientes!" } });

        try {
            let course = await Course.findById(id);
            if (!course) return res.status(400).send({ errors: { MongoError: "Curso não encontrado!" } });
            course = await Course.findByIdAndDelete(id).populate("author");
            return res.send({ message: "Curso excluído!", data: course });
        } catch (err) {
            return res.status(500).send(mongooseErrorHandler.set(err));
        }
    }
};

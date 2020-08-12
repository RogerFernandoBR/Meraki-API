// Course controller basics methods: index, show, store, update, destroy

const Course = require('../models/course');

module.exports = {
  async index(req, res) {
    try {
      const courses = await Course.find({});
      return res.send(courses);
    } catch (err) {
      return res.send(err.errors);
    }
  },

  async show(req, res) {
    const { id } = req.params;

    if (!id) return res.send({ error: 'Dados insuficientes' });

    try {
      const course = await Course.findById(id);
      if (!course) return res.send({ error: 'Curso não encontrado!' });
      return res.send(course);
    } catch (err) {
      return res.send(err.errors);
    }
  },

  async store(req, res) {
    const {
      name, description, thumbnail, author,
    } = req.body;

    if (!name || !description || !thumbnail || !author) return res.send({ error: 'Dados insuficientes!' });

    try {
      const course = await Course.create(req.body);
      course.password = undefined;
      return res.send(course);
    } catch (err) {
      return res.send(err.errors);
    }
  },

  async update(req, res) {
    const { id } = req.params;

    if (!id) return res.send({ error: 'Dados insuficientes!' });

    try {
      let course = await Course.findById(id);
      if (!course) return res.send({ error: 'Curso não existe na base!' });
      course = await Course.findByIdAndUpdate(id, req.body, { new: true });
      return res.send(course);
    } catch (err) {
      return res.send(err.errors);
    }
  },

  async destroy(req, res) {
    const { id } = req.params;

    if (!id) return res.send({ error: 'Dados insuficientes!' });

    try {
      let course = await Course.findById(id);
      if (!course) return res.send({ error: 'Curso não existe na base!' });
      course = await Course.findByIdAndDelete(id);
      return res.send({ message: 'Curso excluído!' });
    } catch (err) {
      return res.send(err.errors);
    }
  },
};

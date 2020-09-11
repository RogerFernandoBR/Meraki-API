const File = require("../models/fileSchema");
const crypto = require("crypto");

module.exports = {

    async show(req, res) {
        const { id } = req.params;

        try {
            let file = await File.findById(id);
            return res.send(file);
        } catch{
            return res.send({ errors: { erro: err } });
        }

    },
    async store(req, res) {
        const { user, course, lesson } = req.body;
        const { originalname: name, filename: path } = req.file;

        const file = await File.create({
            name,
            user,
            course,
            lesson,
            path,
        });
        res.json(file);
    }
};

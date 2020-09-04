const File = require("../models/fileSchema");

module.exports = {
    async store(req, res) {
        const { user, course, lesson } = req.body;
        const { originalname: name, filename: path } = req.file;
        const file = await File.create({
            name,
            user,
            course,
            lesson,
            path
        });
        res.json(file);
    }
};

const File = require("../models/fileSchema");

module.exports = {
    async store(req, res) {
        const { originalname: name, filename: path } = req.file;
        const file = await File.create({
            name,
            path
        });
        res.json(file);
    }
};

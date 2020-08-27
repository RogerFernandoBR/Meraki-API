const mongoose = require("mongoose");

const { Schema } = mongoose;

const FileSchema = new Schema({
    name: {
        type: String,
        required: [true, "O nome é obrigatório"]
    },
    path: {
        type: String,
        required: [true, "O path é obrigatório!"]
    },
    status: {
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model("File", FileSchema);

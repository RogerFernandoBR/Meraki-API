const mongoose = require("mongoose");

const { Schema } = mongoose;

const CourseSchema = new Schema({
    name: {
        type: String,
        required: [true, "O nome é obrigatório!"],
        minlength: [2, "O nome deve ter no mínimo 2 caracteres!"],
        maxlength: [65, "O nome deve ter no máximo 65 caracteres!"]
    },
    description: {
        type: String,
        required: [true, "A descrição é obrigatória!"],
        minlength: [20, "A descrição deve ter no mínimo 20 caracteres!"],
        maxlength: [250, "A descrição deve ter no máximo 250 caracteres!"]
    },
    cover: {
        type: String,
        required: [true, "A imagem de capa é obrigatória!"]
    },
    category: {
        type: Number,
        default: 1
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "O autor é obrigatório!"]
    },
    status: {
        type: Number,
        default: 1,
        min: [0, "Status invalido!"],
        max: [3, "Status invalido!"]
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Course", CourseSchema);

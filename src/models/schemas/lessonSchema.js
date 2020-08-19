const mongoose = require("mongoose");

const { Schema } = mongoose;

const LessonSchema = new Schema({
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
    sequence: {
        type: Number,
        required: [true, "A sequência é obrigatória!"],
        default: 0
    },
    adress: {
        type: String,
        required: [true, "O endereço é obrigatório!"]
    },
    thumbnail: {
        type: String,
        required: [true, "A imagem é obrigatória!"]
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "O autor é obrigatório"]
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: [true, "O curso é obrigatório!"]
    },
    status: {
        type: Number,
        default: 1,
        min: [0, "Status invalido!"],
        max: [3, "Status invalido!"]
    },
    type: {
        type: Number,
        default: 1
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Lesson", LessonSchema);

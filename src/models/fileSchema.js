const mongoose = require("mongoose");

const { Schema } = mongoose;

const FileSchema = new Schema({
    name: {
        type: String,
        required: [true, "O nome é obrigatório"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "O autor é obrigatório"]
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: [true, "O curso é obrigatório!"]
    },
    lesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
        required: [true, "A aula é obrigatória!"]
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

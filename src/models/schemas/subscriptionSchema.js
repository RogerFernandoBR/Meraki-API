const mongoose = require("mongoose");

const { Schema } = mongoose;

const SubscriptionSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "O usuário é obrigatório!"]
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
    status: {
        type: Number,
        default: 1,
        min: [0, "Status invalido!"],
        max: [3, "Status invalido!"]
    },
    currentTime: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model("Subscription", SubscriptionSchema);

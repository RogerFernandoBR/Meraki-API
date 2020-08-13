const mongoose = require("mongoose");

const { Schema } = mongoose;

const LessonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sequence: {
        type: Number,
        required: true,
        default: 0
    },
    adress: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    status: {
        type: Number,
        default: 1
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

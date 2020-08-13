const mongoose = require("mongoose");

const { Schema } = mongoose;

const SubscriptionSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    lesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
        required: true
    },
    status: {
        type: Number,
        default: 1
    },
    currentTime: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model("Subscription", SubscriptionSchema);

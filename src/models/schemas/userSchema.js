const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "O nome é obrigatório"],
        minlength: [2, "O nome deve ter no mínimo 2 caracteres!"],
        maxlength: [65, "O nome deve ter no máximo 65 caracteres!"]
    },
    email: {
        type: String,
        required: [true, "O e-mail é obrigatório!"],
        unique: true,
        lowercase: true,
        match: [/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/, "O e-mail digitado é inválido!"]
    },
    emailStatus: {
        type: Number,
        require: true,
        default: 0
    },
    password: {
        type: String,
        required: [true, "A senha é obrigatória!"],
        select: false
    },
    avatar: {
        type: String,
        required: false
    },
    type: {
        type: Number,
        default: 1
    },
    status: {
        type: Number,
        default: 1
    },
    passwordResetToken: {
        type: String,
        select: false
    },
    passwordResetExpires: {
        type: Date,
        select: false
    },
    created: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre("save", async function checkPassword(next) {
    const user = this;
    if (!user.isModified("password")) return next();

    user.password = await bcrypt.hash(user.password, 10);
    return next();
});

UserSchema.plugin(uniqueValidator, { message: "Este e-mail já está cadastrado" });

module.exports = mongoose.model("User", UserSchema);

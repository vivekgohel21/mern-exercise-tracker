const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 16,
        trim: true,
        unique: true,
        lowercase: true
    },
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);
module.exports = User;

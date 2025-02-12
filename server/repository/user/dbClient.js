const mongoose = require("mongoose");

const otpModelSchema = new mongoose.Schema({
    otp: { type: String },
    expiresIn: { type: String },
});

const userModelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        // otpDetails: { type: otpModelSchema },
    },
    { timestamps: true }
);

const userModelSechmaDbClient = mongoose.model("user", userModelSchema);

module.exports = userModelSechmaDbClient;

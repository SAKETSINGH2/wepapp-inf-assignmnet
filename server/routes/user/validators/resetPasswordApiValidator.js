const { body } = require("express-validator");

const ResetPasswordApiValidator = [
    body("password").isString().withMessage("password is required"),
    body("token").isString().withMessage("access token is required"),
];

module.exports = ResetPasswordApiValidator;

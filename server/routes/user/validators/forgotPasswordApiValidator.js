const { body } = require("express-validator");

const ForgotPasswordApiValidator = [
    body("email").isString().withMessage("email is required"),
];

module.exports = ForgotPasswordApiValidator;

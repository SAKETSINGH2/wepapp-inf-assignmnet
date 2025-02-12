const { body } = require("express-validator");

const loginApiValidator = [
    body("nameOrEmail").isString().withMessage("name or email is required"),
    body("password").isString().withMessage("password is required"),
];

module.exports = loginApiValidator;

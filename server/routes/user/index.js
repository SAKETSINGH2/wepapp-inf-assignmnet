const express = require("express");
const UserRepository = require("../../repository/user/index");
const userRegistrationApiValidator = require("./validators/userRegistrationApiValidator");
const requestParamsValidator = require("../../utils/requestParamsValidator");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const generateToken = require("../../utils/generateToken");
const mailSender = require("../../utils/mailSender");
const loginApiValidator = require("./validators/loginApiValidator");
const setApiResponse = require("../../utils/setApiResponse");
const jwt = require("jsonwebtoken");
const ResetPasswordApiValidator = require("./validators/resetPasswordApiValidator");
const ForgotPasswordApiValidator = require("./validators/forgotPasswordApiValidator");

dotenv.config();

const router = express.Router();

const userRepository = new UserRepository();

// signup router with validation
router.post(
    "/signup",
    userRegistrationApiValidator,
    requestParamsValidator,
    async (req, res, next) => {
        const { name, email, password } = req.body;
        let responseDetails;

        try {
            // first we check user already registered or not
            const user = await userRepository.isUserAlreadyResgistered(
                name,
                email
            );

            // if registered then send response
            if (user) {
                return setApiResponse(
                    400,
                    false,
                    true,
                    "user already signed up",
                    res
                );
            }
            //  if user not registered then registration process continue karege..
            let hashedPassword;

            try {
                // password hashing for security puspose
                hashedPassword = await bcrypt.hash(password, 10);
            } catch (error) {
                return setApiResponse(
                    400,
                    false,
                    true,
                    "issue in hashing password",
                    res
                );
            }

            // in this we can create or save the user details in database
            responseDetails = await userRepository.registerUser({
                name,
                email,
                password: hashedPassword,
            });

            if (!responseDetails) {
                return setApiResponse(
                    400,
                    false,
                    true,
                    "error is user signup",
                    res
                );
            }
            //if user created or signed up successfully after that generate token using jsonwebtoken
            const token = await generateToken(responseDetails);

            // after that we can send a welcome message to user via email
            let body = `welcome,${responseDetails.name}`;
            try {
                await mailSender(
                    responseDetails.email,
                    "you have successfully signed up",
                    body
                );
            } catch (error) {
                console.log("failed to send signup mail");
            }

            // In this step we maintain the responseData object to send the api response
            let responsedata = {
                name: responseDetails.name,
                email: responseDetails.email,
                token,
            };

            return setApiResponse(200, true, false, responsedata, res);
        } catch (error) {
            return next(error);
        }
    }
);

// login router with validation
router.post(
    "/login",
    loginApiValidator,
    requestParamsValidator,
    async (req, res, next) => {
        // first we get required field or data from request
        const { nameOrEmail, password } = req.body;

        try {
            // we can check if user created account or not first means signup first
            let user = await userRepository.getUserByNameOrEmail(nameOrEmail);

            // if user not created account then return a response
            if (!user) {
                return setApiResponse(400, false, true, "user not found", res);
            }

            // if user extis then login process...
            // then we check user current password from the request and user real passwaord from the database
            let validatePassword = await bcrypt.compare(
                password,
                user.password
            );

            // if agr password entered from the user and password accosiated with user not matched then send response
            if (!validatePassword) {
                return setApiResponse(
                    400,
                    false,
                    true,
                    "Invalid password , please enter valid password",
                    res
                );
            }

            // if user password matched then we can generate the token with maintain a payload related to user details
            const token = await generateToken(user);

            // then maintain a reponseData
            let responseData = {
                id: user._id,
                name: user.name,
                email: user.email,
                token,
            };

            return setApiResponse(200, true, false, responseData, res);
        } catch (error) {
            return next(error);
        }
    }
);

// forgot password router with validation
router.post(
    "/forgot_password",
    ForgotPasswordApiValidator,
    requestParamsValidator,
    async (req, res, next) => {
        const { email } = req.body;
        let user;

        try {
            // first we find the user related to this email in not then we will not send a email to reset the password
            user = await userRepository.getUserByEmail(email);

            if (!user) {
                return setApiResponse(
                    400,
                    false,
                    true,
                    "user not found with this email",
                    res
                );
            }

            // if user found then generate token and send reset password link via email

            const token = await generateToken(user);

            // in this step we make a string and string contain a frontend url resetPage url and also set a token for the validate user
            const resetPasswordLink = `http://localhost:3000/reset_password?token=${token}`;

            // send email for reset password process
            let title = "you have received reset password link";
            await mailSender(user.email, title, resetPasswordLink);

            return setApiResponse(
                200,
                true,
                false,
                "reset password link sent successfully",
                res
            );
        } catch (error) {
            return next(error);
        }
    }
);

// reset password router
router.post(
    "/reset_password",
    ResetPasswordApiValidator,
    requestParamsValidator,
    async (req, res, next) => {
        // get token and passoward from then request
        const { token, password } = req.body;
        let responseDetails;
        let user;

        try {
            // In this step validating the token for
            const decodeData = await jwt.verify(token, process.env.JWT_SECRET);

            // we check this user is exits or not
            user = await userRepository.getUserByEmail(decodeData.email);

            if (!user) {
                return setApiResponse(
                    400,
                    false,
                    true,
                    "user not found with this email",
                    res
                );
            }
            // if exits then we hashed the user password come from the request
            const hashedPassword = await bcrypt.hash(password, 10);

            // after that we set the updated password in the database
            responseDetails = await userRepository.updatePassword(
                decodeData.email,
                hashedPassword
            );

            if (!responseDetails) {
                return setApiResponse(
                    400,
                    false,
                    true,
                    "issue in reseting the password"
                );
            }

            return setApiResponse(
                200,
                true,
                false,
                "password changed sucessfully",
                res
            );
        } catch (error) {
            return next(error);
        }
    }
);

module.exports = router;

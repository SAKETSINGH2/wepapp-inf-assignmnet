const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

// this middleware we can use when we have some user related authentication api.
const authenticatedUser = (req, res, next) => {
    try {
        // first we can extract the token from the request header
        const token = req.header("Authorization").replace("Bearer ", "");

        // if token not found then return this response
        if (!token) {
            return res.status(401).json({
                message: "Access denied",
            });
        }

        // if token found then token verification process and add the userId in the request for the further use
        const decodedData = jwt.verify(token, process.env.JWT_SECRET || "");
        req.userId = decodedData.userId;
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = authenticatedUser;

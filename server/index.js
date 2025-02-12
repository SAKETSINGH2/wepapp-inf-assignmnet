const express = require("express");
const apiRouter = require("./routes/index");
const connectDb = require("./config/databaseConnection");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

connectDb();

app.use(express.json());
app.use(
    cors({
        origin: "*",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

app.use("/backend/api", apiRouter);

app.listen(PORT, (error) => {
    if (error) {
        console.log(`Error while listing the app with error-`, error.message);
    }
    console.log(`App is running at ${PORT}`);
});

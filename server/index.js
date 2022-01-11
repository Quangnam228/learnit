require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");

const POST = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/mern-learnit", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        });
        console.log("MongoDB connect");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
connectDB();

app.get("/", (req, res) => {
    res.send("hello world");
});
app.use("/auth", authRouter);
app.use("/posts", postRouter);

app.listen(POST);

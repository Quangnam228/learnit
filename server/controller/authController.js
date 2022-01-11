const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

let refreshTokens = []; //database
class authController {
    // @route Get /auth
    // @desc Check if user is logged in
    // @access public
    async checkUser(req, res) {
        try {
            const user = await User.findById(req.userId).select("-password");
            if (!user)
                return res
                    .status(400)
                    .json({ success: false, message: "User not found" });
            res.json({ success: true, user });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }
    // @route POST auth/register
    // @desc Register user
    // @access Public
    async register(req, res) {
        const { username, password } = req.body;

        // Simple validation
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "missing username and/or password",
            });
        }
        try {
            //Check for existing User
            const user = await User.findOne({ username });
            if (user) {
                return res.status(400).json({
                    success: false,
                    message: "Username already taken",
                });
            }

            // All good
            const hashedPassword = await argon2.hash(password);
            const newUser = new User({ username, password: hashedPassword });

            await newUser.save();
            // Return token
            const accessToken = jwt.sign(
                { userId: newUser._id },
                process.env.ACCESS_TOKEN_SECRET
                // { expiresIn: "24h" }
            );
            const refreshToken = jwt.sign(
                { userId: newUser._id },
                process.env.REFRESH_TOKEN_SECRET
                // { expiresIn: "24h" }
            );
            res.json({
                success: true,
                message: "User created success",
                accessToken: accessToken,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    //
    // refreshNewToken(req, res) {
    //     const refreshToken = req.body.token;
    //     if (!refreshToken) {
    //         res.sendStatus(401);
    //     }
    //     if (!refreshTokens.includes(refreshToken)) {
    //         res.sendStatus(4013);
    //         jwt.verify(
    //             refreshToken,
    //             process.env.REFRESH_TOKEN_SECRET,
    //             (err, data) => {
    //                 if (err) {
    //                     sendStatus(403);
    //                 }
    //                 const accessToken = jwt.verify(
    //                     { username: data.username },
    //                     process.env.ACCESS_TOKEN_SECRET
    //                 );
    //                 res.json({ accessToken });
    //             }
    //         );
    //     }
    // }
    //login
    // @route POST auth/login
    // @desc Register user
    // @access Public
    async login(req, res) {
        const { username, password } = req.body;

        // Simple validation
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "missing username and/or password",
            });
        }
        try {
            // Check for existing user
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "Incorrect username or password",
                });
            }
            //Username found
            const passwordValid = await argon2.verify(user.password, password);
            if (!passwordValid) {
                return res.status(400).json({
                    success: false,
                    message: "Incorrect username or password",
                });
            }
            // Return token
            const accessToken = jwt.sign(
                { userId: user._id },
                process.env.ACCESS_TOKEN_SECRET
            );
            res.json({
                success: true,
                message: "User logged in successfully",
                accessToken: accessToken,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }
}

module.exports = new authController();

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authController = require("../controller/authController");

const verifyToken = require("../middleware/auth");

// router.get("/", verifyToken, authController.checkUser);
router.get("/", verifyToken, async (req, res) => {
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
});

router.post("/register", authController.register);

router.post("/login", authController.login);

module.exports = router;

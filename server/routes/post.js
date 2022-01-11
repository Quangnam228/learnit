const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");

const postsController = require("../controller/postsController");

router.get("/", verifyToken, postsController.getPost);

router.post("/", verifyToken, postsController.postPost);

router.put("/:id", verifyToken, postsController.updatePost);

router.delete("/:id", verifyToken, postsController.deletePost);

module.exports = router;

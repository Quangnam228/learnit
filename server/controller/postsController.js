const Post = require("../models/Post");
class postsController {
    //@route Get posts
    //desc Get post
    //@access private
    async getPost(req, res) {
        try {
            const posts = await Post.find({ user: req.userId }).populate(
                "user",
                ["username"]
            );
            res.json({ success: true, posts });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    //@route POST posts
    //desc Create post
    //@access private
    async postPost(req, res) {
        const { title, description, url, status } = req.body;

        //Simple valifation
        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required",
            });
        }
        try {
            const newPost = new Post({
                title,
                description,
                url: url.startsWith("https://") ? url : `https://${url}`,
                status: status || "To Learn",
                user: req.userId,
            });
            await newPost.save();

            res.json({
                success: true,
                message: "Happly learning!",
                post: newPost,
            });
        } catch (error) {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    //@route PUT posts
    //desc update post
    //@access private
    async updatePost(req, res) {
        const { title, description, url, status } = req.body;

        //Simple valifation
        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required",
            });
        }
        try {
            let updatePost = {
                title,
                description: description || "",
                url:
                    (url.startsWith("https://") ? url : `https://${url}`) || "",
                status: status || "To Learn",
            };

            const postUpdateCondition = {
                _id: req.params.id,
                user: req.userId,
            };

            updatePost = await Post.findByIdAndUpdate(
                postUpdateCondition,
                updatePost,
                { new: true }
            );
            // user not authorised to update post or post not found
            if (!updatePost) {
                return res.status(401).json({
                    success: false,
                    message: "user not authorised or post not found",
                });
            }
            res.json({
                success: true,
                message: "Excellent progress!",
                post: updatePost,
            });
        } catch (error) {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    //@route DELETE posts
    //desc DELETE post
    //@access private
    async deletePost(req, res) {
        try {
            const postDeleteCondition = {
                _id: req.params.id,
                user: req.userId,
            };
            const deletePost = await Post.findByIdAndDelete(
                postDeleteCondition
            );
            // user not authorised to update post or post not found
            if (!deletePost) {
                return res.status(401).json({
                    success: false,
                    message: "user not authorised or post not found",
                });
            }
            res.json({
                success: true,
                post: deletePost,
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

module.exports = new postsController();

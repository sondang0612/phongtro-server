const express = require("express");
const postController = require("../src/controllers/post");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.get("/all", postController.getPosts);
router.get("/limit", postController.getPostsLimit);
router.get("/newest-posts", postController.getNewestPosts);
router.get("/get/:id", postController.getPost);
router.get("/category/:categoryCode", postController.getPostsByCategory);

router.use(verifyToken);
router.post("/create", postController.createPost);
router.get("/my-posts", postController.getMyPostsLimit);
router.delete("/:postId", postController.deleteMyPost);
module.exports = router;

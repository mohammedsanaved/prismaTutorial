import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import {
  createPost,
  deletePost,
  getAllPost,
  updatePost,
} from "../controller/postController.js";
const router = express.Router();

router.route("/post/create").post(isLoggedIn, createPost);
router.route("/post/update/:id").put(isLoggedIn, updatePost);
router.route("/post/delete/:id").delete(isLoggedIn, deletePost);
router.route("/post/get").get(getAllPost);

export default router;

import express from "express";
import { isAuth } from "../middleware/auth.js";
import {
  commentOnBlog,
  createBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
} from "../controllers/blog.js";

const blogRouter = express.Router();

blogRouter.route("/new").post(isAuth, createBlog);
blogRouter.route("/all").get(getAllBlogs);
blogRouter.route("/blog/:id").get(getSingleBlog);
blogRouter
  .route("/blog/:id")
  .get(getSingleBlog)
  .delete(isAuth, deleteBlog)
  .post(isAuth, commentOnBlog);

export { blogRouter };

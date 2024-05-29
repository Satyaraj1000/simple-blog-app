import express from "express";
import { isAuth } from "../middleware/auth.js";
import { createBlog, getAllBlogs, getSingleBlog } from "../controllers/blog.js";

const blogRouter = express.Router();

blogRouter.route("/new").post(isAuth, createBlog);
blogRouter.route('/all').get(getAllBlogs);
blogRouter.route('/blog/:id').get(getSingleBlog);

export { blogRouter };

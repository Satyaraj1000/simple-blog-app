import Blog from "../models/Blog.models.js";
import User from "../models/User.models.js";

const createBlog = async (req, res) => {
  try {
    const { title, description, blog, category, ownername, image } = req.body;

    const createdBlog = await Blog.create({
      title,
      description,
      blog,
      owner: req.user._id,
      ownername,
      image,
      category,
    });
    res.status(201).json({
      message: "Blog Created",
      createdBlog,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blog = await Blog.find();

    res.status(200).json({ blog });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    res.json({ blog });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (blog.owner.toString() !== req.user._id.toString())
      return res.status(403).json({
        message: "you are not owner of this blog",
      });

    await blog.deleteOne();

    res.status(200).json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const commentOnBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    const user = await User.findById(req.user._id);

    blog.comments.comment = req.body.comment;
    blog.comments.push({
      user: user.name,
      userid: user._id,
      comment: req.body.comment,
    });

    await blog.save();

    res.json({
      message: "Comment Added",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export { createBlog, getAllBlogs, getSingleBlog, deleteBlog, commentOnBlog };

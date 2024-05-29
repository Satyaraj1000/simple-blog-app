import Blog from "../models/Blog.models.js";

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

export { createBlog, getAllBlogs, getSingleBlog };

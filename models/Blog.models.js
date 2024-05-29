import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    requires: true,
  },
  description: {
    type: String,
    requires: true,
  },
  blog: {
    type: String,
    requires: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    requires: true,
  },
  ownername: {
    type: String,
    requires: true,
  },
  category: {
    type: String,
    requires: true,
  },
  image: {
    type: String,
    requires: true,
  },
  comments: [
    {
      user: {
        type: String,
        required: true,
      },
      userid: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
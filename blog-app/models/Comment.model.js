const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    blogId: {
      type: mongoose.Types.ObjectId,
      ref: "Blog",
    },
  },
  { timestamps: true },
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;

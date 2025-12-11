const mongoose = require("mongoose");
const { Scehma, model } = mongoose;

const postSchema = new Scehma({
  title: {
    type: String,
    required: true,
    min: 4,
  },
  summary: {
    type: String,
    required: true,
    min: 5,
  },
  content: {
    type: String,
    required: true,
    min: 10,
  },
  image: {
    type: String,
    required: false,
  },
  author: {
    type: Scehma.Types.ObjectId,
    required: true , ref: "User",
  },

}, { timestamps: true });

module.exports = model("Post", postSchema);

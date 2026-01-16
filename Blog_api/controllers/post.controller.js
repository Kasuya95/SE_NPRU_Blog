const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    console.log("=== CREATE POST START ===");
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);
    console.log("req.authorId:", req.authorId);

    if (!req.file) {
      console.log("❌ No file provided");
      return res.status(400).json({ message: "image is required" });
    }

    const { title, summary, content } = req.body;
    const authorId = req.authorId;

    if (!title || !summary || !content) {
      console.log("❌ Missing required fields");
      return res.status(400).json({
        message: "title, summary, content are required!!",
      });
    }

    if (!authorId) {
      console.log("❌ No authorId");
      return res.status(400).json({
        message: "Author ID is missing",
      });
    }

    console.log("✅ All validations passed, creating post...");
    console.log("Cover URL:", req.file.firebaseUrl);

    const post = await Post.create({
      title,
      summary,
      content,
      cover: req.file.firebaseUrl,
      author: authorId,
    });

    if (!post) {
      console.log("❌ Post creation failed");
      return res.status(500).send({
        message: "Cannot create a new post",
      });
    }

    console.log("✅ Post created successfully:", post._id);
    res.json({
      message: "Post Created Successfully.",
      post,
    });
  } catch (error) {
    console.error("❌ Error in createPost:", error);
    return res
      .status(500)
      .json({ msg: "Server error at create post", error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    // populate คือการ join table
    // -1 revert
    const posts = await Post.find()
      .populate("author", ["username"])
      .sort({ created: -1 })
      .limit(10);
    // เอาไว้เช็ค หน้าบ้าน (อันนี้ logic)
    // if (posts.length <= 0) {
    //   res.send("no post");
    // }
    // อันนี้ ้เช็ค bug
    if (!posts) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.send(posts);
  } catch (error) {
    return res.status(500).json({ msg: "Server error at get all", error });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: "Id is missing" });
    }

    const post = await Post.findById(id).populate("author", ["username"]);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.send(post);
  } catch (error) {
    return res.status(500).json({ msg: "Server error at find by id", error });
  }
};

exports.getByAuthorId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: "author is missing" });
    }

    const posts = await Post.find({ author: id }).populate("author", [
      "username",
    ]);
    if (!posts) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.send(posts);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error at find by id", error });
  }
};

exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const authorId = req.authorId;

    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }

    const { title, summary, content } = req.body;

    if (!title || !summary || !content) {
      return res.status(400).json({
        message: "title, summary, content are required",
      });
    }

    // เตรียม data ที่จะ update
    const updateData = {
      title,
      summary,
      content,
    };

    // ✅ ถ้ามีอัปโหลดรูปใหม่
    if (req.file) {
      console.log("✅ New cover uploaded:", req.file.firebaseUrl);
      updateData.cover = req.file.firebaseUrl;
    }

    const updated = await Post.findOneAndUpdate(
      { _id: id, author: authorId },
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({
      message: "Post Updated Successfully!",
      post: updated,
    });
  } catch (error) {
    console.error("❌ Error update post:", error);
    res.status(500).json({
      message: "Server error at update by id",
    });
  }
};


exports.patchById = async (req, res) => {
  try {
    const { id } = req.params;
    const authorId = req.authorId;
    if (!id) {
      return res.status(400).json({ message: "id is required!" });
    }

    const { title, summary, content, cover } = req.body;
    // ถ้า “ไม่มีค่าเลยสัก field เดียว” → ให้ error
    if (!title && !summary && !content && !cover) {
      return res
        .status(400)
        .json({ message: "at least one field is required" });
    }

    const updated = await Post.findOneAndUpdate(
      { _id: id, author: authorId },
      { title, summary, content, cover },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Patch Updated Successfully!", result: updated });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server error at update by id", error: error });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const authorId = req.authorId;
    if (!id) {
      return res.status(400).json({ message: "id is required!" });
    }

    const deleted = await Post.findOneAndDelete({ _id: id, author: authorId });
    if (!deleted) {
      return res.status(500).json({ message: "Can't Delete The Post" });
    }

    res.json({ message: "Post Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error at delete by id" });
  }
};

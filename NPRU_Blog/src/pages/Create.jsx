import React, { useRef, useState } from "react";
import PostService from "../../services/post.service.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Editor from "../components/Editor.jsx";

const Create = () => {
  const navigate = useNavigate();
  const editorRef = useRef(null);

  const [post, setPost] = useState({
    title: "",
    author: "",
    summary: "",
    content: "",
    cover: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (value) => {
    setPost((prev) => ({ ...prev, content: value }));
  };

  const resetForm = () => {
    setPost({
      title: "",
      author: "",
      summary: "",
      content: "",
      cover: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await PostService.createPost(post);

      if (res.status === 201 || res.status === 200) {
        await Swal.fire({
          title: "Add new post",
          text: "Post created successfully!",
          icon: "success",
        });
        resetForm();
        navigate("/");
      }
    } catch (error) {
      await Swal.fire({
        title: "Add new post",
        text: error.response?.data?.message || "Request failed",
        icon: "error",
      });
      console.error("Create post error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-base-200">
      <div className="w-full max-w-6xl">
        <div className="card bg-base-100 shadow-xl rounded-lg">
          <div className="card-body">
            <h1 className="text-3xl font-bold text-center mb-8">Create Post</h1>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* LEFT */}
              <div className="md:col-span-1">
                <label className="label font-semibold">Cover Image URL</label>
                <input
                  type="text"
                  name="cover"
                  value={post.cover}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />

                <img
                  src={
                    post.cover ||
                    "https://via.placeholder.com/300x200?text=Preview"
                  }
                  className="mt-4 rounded border h-56 w-full object-contain"
                />
              </div>

              {/* RIGHT */}
              <div className="md:col-span-2 space-y-4">
                <input
                  type="text"
                  name="title"
                  value={post.title}
                  onChange={handleChange}
                  placeholder="Title"
                  className="input input-bordered w-full"
                  required
                />

                <input
                  type="text"
                  name="author"
                  value={post.author}
                  onChange={handleChange}
                  placeholder="Author"
                  className="input input-bordered w-full"
                />

                <textarea
                  name="summary"
                  value={post.summary}
                  onChange={handleChange}
                  placeholder="Summary"
                  className="textarea textarea-bordered w-full"
                />

                <Editor
                  ref={editorRef}
                  value={post.content}
                  onChange={handleContentChange}
                />
              </div>

              <div className="md:col-span-3 flex justify-center gap-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn btn-outline"
                >
                  Reset
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;

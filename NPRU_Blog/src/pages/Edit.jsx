import { useEffect, useState, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { UserContext } from "../../context/UserContext";
import PostService from "../../services/post.service";
import Editor from "../components/Editor.jsx";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);
  const editorRef = useRef(null);

  const [post, setPost] = useState({
    title: "",
    summary: "",
    content: "",
    cover: "", // เก็บ URL เดิมไว้
  });

  const [file, setFile] = useState(null); // ไฟล์ใหม่

  // โหลดข้อมูล post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await PostService.getById(id);

        if (res.status === 200) {
          const data = res.data;

          // เช็คเจ้าของโพสต์
          if (data.author._id !== userInfo?.id) {
            Swal.fire(
              "Error",
              "You are not allowed to edit this post",
              "error"
            );
            navigate("/");
            return;
          }

          setPost({
            title: data.title,
            summary: data.summary,
            content: data.content,
            cover: data.cover,
          });
        }
      } catch (error) {
        Swal.fire(
          "Error",
          error?.response?.data?.message || error.message,
          "error"
        );
      }
    };

    fetchPost();
  }, [id, userInfo, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (value) => {
    setPost((prev) => ({ ...prev, content: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!post.title || !post.summary || !post.content) {
      Swal.fire("Error", "All fields are required", "error");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("summary", post.summary);
      formData.append("content", post.content);

      // ถ้าเลือกไฟล์ใหม่ → ส่งไฟล์
      if (file) {
        formData.append("cover", file);
      }

      const res = await PostService.updatePost(id, formData);

      if (res.status === 200) {
        await Swal.fire("Success", "Post updated successfully", "success");
        navigate(`/post/${id}`);
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error?.response?.data?.message || error.message,
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-base-200">
      <div className="w-full max-w-6xl">
        <div className="card bg-base-100 shadow-xl rounded-lg">
          <div className="card-body">
            <h1 className="text-3xl font-bold text-center mb-8">Edit Post</h1>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* LEFT */}
              <div className="md:col-span-1">
                <label className="label font-semibold">Cover Image</label>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="file-input file-input-bordered w-full"
                />

                {/* preview */}
                {file ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="mt-4 rounded border h-56 w-full object-contain"
                  />
                ) : (
                  post.cover && (
                    <img
                      src={post.cover}
                      alt="old cover"
                      className="mt-4 rounded border h-56 w-full object-contain"
                    />
                  )
                )}
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

                <textarea
                  name="summary"
                  value={post.summary}
                  onChange={handleChange}
                  placeholder="Summary"
                  className="textarea textarea-bordered w-full"
                  required
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
                  onClick={() => navigate(-1)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;

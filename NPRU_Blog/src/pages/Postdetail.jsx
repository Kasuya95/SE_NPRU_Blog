import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { UserContext } from "../../context/UserContext";
import PostService from "../../services/post.service";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);

  const [post, setPost] = useState({
    title: "",
    summary: "",
    content: "",
    cover: "",
    createdAt: "",
    author: {},
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await PostService.getById(id);
        if (response.status === 200) {
          setPost(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Post Detail",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Delete post?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await PostService.deletePost(post._id);
      if (response.status === 200) {
        Swal.fire("Deleted!", "Post deleted successfully", "success");
        navigate("/");
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
    <div className="min-h-screen bg-base-200 pt-24 px-4">
      <div className="max-w-4xl mx-auto bg-base-100 shadow-xl rounded-lg overflow-hidden">
        {/* Cover */}
        {post.cover && (
          <img
            src={post.cover}
            alt="cover"
            className="w-full h-80 object-cover"
          />
        )}

        <div className="p-8">
          {/* Title */}
          <h1 className="text-4xl font-bold mb-4 text-center">{post.title}</h1>

          {/* Meta */}
          <div className="text-center text-gray-500 mb-6 space-y-1">
            <time className="block">
              {new Date(post.createdAt).toLocaleDateString("th-TH", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>

            <div>
              By{" "}
              <a
                
                className="text-primary font-semibold"
              >
                @{post.author?.username}
              </a>
            </div>

            {userInfo?.id === post.author?._id && (
              <div className="flex justify-center gap-3 mt-4">
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => navigate(`/edit/${post._id}`)}
                >
                  Edit
                </button>
                <button className="btn btn-error btn-sm" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            )}
          </div>

          {/* Summary */}
          {post.summary && (
            <p className="text-lg text-center text-gray-600 mb-8 italic">
              {post.summary}
            </p>
          )}

          {/* Content */}
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

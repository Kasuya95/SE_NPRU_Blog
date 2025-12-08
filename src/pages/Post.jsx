import React from "react";
import { useParams } from "react-router";
import { posts } from "../data/post";

const Post = () => {
  const { id } = useParams();
  const post = posts.find((p) => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="min-h-screen bg-base-200 py-10">
        <div className="max-w-4xl mx-auto card bg-base-100 shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center">Post not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-10">
      <div className="max-w-4xl mx-auto card bg-base-100 shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center leading-snug">
          {post.title}
        </h1>

        <p className="text-center text-sm opacity-70 mt-3">
          {post.date}
          <br />
          by {post.author}
        </p>

        <p className="mt-6 leading-relaxed">{post.content}</p>

        {/* ภาพแบนเนอร์ */}
        <figure className="mt-8">
          <img
            src={post.image}
            alt={post.title}
            className="rounded-xl shadow-md"
          />
        </figure>

        <p className="mt-6 leading-relaxed">{post.summary}</p>
      </div>
    </div>
  );
};

export default Post;

import React from "react";
import { useNavigate } from "react-router";
import { posts } from "../data/post";

const Home = () => {
  const navigate = useNavigate();

  const handleCardClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-purple-600 p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-10">
        {/** ░░ CARD 1 ░░ แบบรูปภาพซ้าย / ข้อความขวา */}
        <div
          onClick={() => handleCardClick(posts[0].id)}
          className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row cursor-pointer hover:shadow-xl transition-shadow"
        >
          <img
            src={posts[0].image}
            className="w-full md:w-1/2 h-64 object-cover"
          />
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
              {posts[0].title}
            </h2>
            <p className="text-gray-600 mb-4">{posts[0].summary}</p>
            <p className="text-sm text-gray-500">
              {posts[0].author} | {posts[0].date}
            </p>
          </div>
        </div>

        {/** ░░ CARD 2 ░░ แบบข้อความซ้าย / รูปภาพขวา */}
        <div
          onClick={() => handleCardClick(posts[1].id)}
          className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row-reverse cursor-pointer hover:shadow-xl transition-shadow"
        >
          <img
            src={posts[1].image}
            className="w-full md:w-1/2 h-64 object-cover"
          />
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
              {posts[1].title}
            </h2>
            <p className="text-gray-600 mb-4">{posts[1].summary}</p>
            <p className="text-sm text-gray-500">
              {posts[1].author} | {posts[1].date}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

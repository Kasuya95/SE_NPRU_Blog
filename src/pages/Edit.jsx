import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const Edit = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  // ตัวอย่างค่าเดิม (คุณจะดึงจาก API ก็ได้)
  const [title, setTitle] = useState("My Existing Title");
  const [summary, setSummary] = useState("Short summary of this post");
  const [content, setContent] = useState("<p>Existing post content...</p>");

  useEffect(() => {
    if (!quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Edit your content...",
      });

      // ตั้งค่า content เดิม
      quillRef.current.root.innerHTML = content;

      // อัปเดต content เมื่อแก้ไข
      quillRef.current.on("text-change", () => {
        setContent(quillRef.current.root.innerHTML);
      });
    }
  }, []);

  return (
    <div className="w-full flex justify-center py-10 bg-gray-50">
      <div className="w-full max-w-[780px] bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        {/* Title */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="
            w-full px-4 py-3 
            border border-gray-300 
            rounded-xl 
            focus:outline-none focus:ring-2 focus:ring-blue-400
            mb-6
          "
        />

        {/* Summary */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Summary
        </label>
        <input
          type="text"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="
            w-full px-4 py-3 
            border border-gray-300 
            rounded-xl 
            focus:outline-none focus:ring-2 focus:ring-blue-400
            mb-6
          "
        />

        {/* Content */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content
        </label>

        <div className="h-[350px] mb-6">
          <div ref={editorRef} className="h-[300px]" />
        </div>

        {/* Upload Image */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Image
        </label>
        <input
          type="file"
          className="
            w-full px-4 py-2 
            border border-gray-300 
            rounded-xl 
            focus:outline-none 
            mb-8
          "
        />

        {/* Button */}
        <button
          className="
            w-full py-3 
            bg-green-600 hover:bg-green-700
            text-white 
            rounded-xl 
            transition font-medium
          "
        >
          Update Post
        </button>
      </div>
    </div>
  );
};

export default Edit;

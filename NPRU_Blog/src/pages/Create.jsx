import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const Create = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write something...",
      });

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
          name="title"
          className="
            w-full px-4 py-3 
            border border-gray-300 
            rounded-xl 
            focus:outline-none focus:ring-2 focus:ring-blue-400
            mb-6
          "
          placeholder="Enter your title…"
        />

        {/* Summary */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Summary
        </label>
        <input
          type="text"
          name="summary"
          className="
            w-full px-4 py-3 
            border border-gray-300 
            rounded-xl 
            focus:outline-none focus:ring-2 focus:ring-blue-400
            mb-6
          "
          placeholder="Enter summary…"
        />

        {/* Content */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content
        </label>

        <div className="h-[350px] mb-6">
          <div ref={editorRef} className="h-[300px]" />
        </div>
        <br></br>

        {/* Upload Image */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Image
        </label>
        <input
          type="file"
          name="image"
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
            bg-blue-600 hover:bg-blue-700 
            text-white 
            rounded-xl 
            transition font-medium
          "
        >
          Create Post
        </button>
      </div>
    </div>
  );
};

export default Create;

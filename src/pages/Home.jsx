import React from "react";

const posts = [
  {
    id: 1,
    title:
      "ซีอีโอรักษาการณ์ Intel บอก ซีอีโอคนใหม่ต้องมีพื้นฐานในกระบวนการผลิตชิป",
    summary:
      "หลังจากอินเทลประกาศไล่ลีน่ากลับเข้ามาช่วยซีอีโอ Pat Gelsinger ลาออกตำแหน่ง ประเด็นมีว่าเขามีท่าทีว่าซีอีโอใหม่ควรเป็นคนที่เข้าใจการผลิตชิป",
    image:
      "https://images.unsplash.com/photo-1580722434936-3cfdbb5c153a?auto=format&fit=crop&w=1200&q=80",
    author: "wuth42",
    date: "05 December 2024 - 23:26",
  },
  {
    id: 2,
    title:
      "KBTG วางเป้าโตด้วย Agentic AI ในปี 2025 ทำงานร่วมกับ AI เหมือนเป็นคู่อาวุโส",
    summary:
      "ในเวทีงานเสวนา AI นี้สำนักเทคโนโลยีใหม่กสิกรบอกว่า Agentic AI เป็นตัวเปลี่ยนเกมสำคัญในปีหน้า ช่วยเพิ่มความสามารถในการทำงานร่วมกับมนุษย์ได้ดีขึ้น",
    image:
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=1200&q=80",
    author: "wuth42",
    date: "05 December 2024 - 21:11",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-purple-600 p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-10">
        {/** ░░ CARD 1 ░░ แบบรูปภาพซ้าย / ข้อความขวา */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
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
        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row-reverse">
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

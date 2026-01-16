const multer = require("multer");
const path = require("path");
const supabase = require("../config/supabase.config");

// set storage engine
const upload = multer({
  storage: multer.memoryStorage(), // เก็บไวในไหน ใน ram
  limits: { fileSize: 1000000 }, // ไม่เกิน 1 mb
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single("cover");

function checkFileType(file, cb) {
  const fileTypes = /jpeg|jpg|png|gif|webp/;
  const extName = fileTypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  const mimetype = fileTypes.test(file.mimetype);
  if (mimetype && extName) {
    return cb(null, true);
  } else {
    cb("Error image only!!");
  }
}

// upload to supabase storage ย้ายจาก ram ไปที่ supabase
async function uploadToFirebase(req, res, next) {
  if (!req.file) {
    console.log("No file uploaded");
    next();
    return;
  }

  // สร้างชื่อไฟล์ที่ไม่ซ้ำ
  const fileName = `uploads/${Date.now()}-${req.file.originalname}`;
  console.log("Uploading file to Supabase:", fileName);

  try {
    // upload file to supabase storage
    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
      });

    if (error) {
      console.error("Supabase upload error:", error);
      return res.status(500).json({
        message:
          error.message || "Something went wrong while uploading to supabase",
      });
    }

    // get public url from supabase
    const { data: publicData } = supabase.storage
      .from("uploads")
      .getPublicUrl(fileName);

    req.file.firebaseUrl = publicData.publicUrl;
    console.log("File uploaded successfully:", req.file.firebaseUrl);
    next();
  } catch (error) {
    console.error("Upload middleware error:", error.message);
    return res.status(500).json({
      message:
        error.message || "Something went wrong while uploading to supabase",
    });
  }
}

module.exports = { upload, uploadToFirebase };

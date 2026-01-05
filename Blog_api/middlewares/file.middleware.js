const multer = require("multer");
const path = require("path");
const firebaseConfig = require("../config/firebase.config");

const {getStorage, ref, uploadBytes, getDownloadURL} = require("firebase/storage");

const {initializeApp} = require("firebase/app");
const app = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(app);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize:1000000 }, // 1MB
  fileFilter: (req, file, cb) => {
    checkFileType(file,cb);
  }
});
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if(mimetype && extname) {
    return cb(null, true);
    } else {
    cb("Error: Images Only!");
  }
}

async function uploadFileToFirebase(req, res, next) {
    if(!req.file) {
        next();
        return;
    }

    const storageRef = ref(firebaseStorage, `images/${Date.now()}_${req.file.originalname}`);
    const metadata = {
        contentType: req.file.mimetype,
    };

    try {
        const snapshot = await uploadBytes(storageRef, req.file.buffer, metadata);
        // เพิ่ม URL ของไฟล์ไปที่ req.file
        req.file.firebaseUrl = await getDownloadURL(snapshot.ref);
        next();
    } catch (error) {
        console.error("Error uploading file to Firebase:", error);
        res.status(500).send({ message: "Error uploading file" });
    }
};


module.exports = {
  upload,
  uploadFileToFirebase,
};
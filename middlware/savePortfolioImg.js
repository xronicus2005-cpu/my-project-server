const multer = require("multer");
const path = require("path");
const fs = require("fs");

// PROFILE UCHUN SAQLASH SOZLAMASI
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = "uploads/portfolio";

    // agar papka mavjud bo‘lmasa — yaratadi
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    cb(null, folder);
  },

  filename: (req, file, cb) => {
    // har bir faylga noyob nom berish
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

// faqat bitta fayl uchun (masalan "photo" deb nomlangan field)
const uploadProfile = multer({
  storage: profileStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // maksimal 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|webp|jfif/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb(new Error("Faqat rasm fayllariga ruxsat berilgan!"));
    }
  },
});

module.exports = uploadProfile;
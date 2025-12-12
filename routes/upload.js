const express = require("express");
const multer = require("multer");
const imagekit = require("../config/imagekit")

const router = express.Router();

// Diskga emas, faqat bufferga olish
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { folder } = req.body; 
    // frontenddan keladi → "profile", "portfolio", "works"

    const uploadFolder = folder ? `/myapp/${folder}` : "/myapp";

    const result = await imagekit.upload({
      file: req.file.buffer,
      fileName: Date.now() + "-" + req.file.originalname,
      folder: uploadFolder
    });

    return res.json({
      url: result.url,
      fileId: result.fileId
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;
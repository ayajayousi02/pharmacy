const express = require("express");
const router = express.Router();

const prescriptionController = require("../controllers/prescriptionController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const multer = require("multer");

// upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

// user
router.post("/", authMiddleware, upload.single("image"), prescriptionController.createPrescription);
router.get("/my", authMiddleware, prescriptionController.getMyPrescriptions);

// admin
router.get("/", authMiddleware, adminMiddleware, prescriptionController.getPrescriptions);
router.put("/:id", authMiddleware, adminMiddleware, prescriptionController.updateStatus);
router.delete("/:id", authMiddleware, adminMiddleware, prescriptionController.deletePrescription);

module.exports = router;
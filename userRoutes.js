const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Routes (أدمن فقط)
router.post("/", authMiddleware, adminMiddleware, userController.createUser);
router.get("/", authMiddleware, adminMiddleware, userController.getUsers);
router.get("/:id", authMiddleware, adminMiddleware, userController.getUserById);
router.put("/:id", authMiddleware, adminMiddleware, userController.updateUser);
router.put("/:id/password", authMiddleware, adminMiddleware, userController.updateUserPassword);
router.delete("/:id", authMiddleware, adminMiddleware, userController.deleteUser);

module.exports = router;

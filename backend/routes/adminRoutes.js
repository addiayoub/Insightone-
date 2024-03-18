const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const auth = require("../middlewares/auth");
router.use(auth);

router.get("/stats", adminController.getStats);
router.get("/getCountOfApiLogs", adminController.getCountOfApiLogs);

module.exports = router;

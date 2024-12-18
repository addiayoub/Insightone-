const express = require("express");
const router = express.Router();
const apiLogController = require("../controllers/ApiLogController");
const auth = require("../middlewares/auth");
router.use(auth);

router.post("/", apiLogController.store);

module.exports = router;

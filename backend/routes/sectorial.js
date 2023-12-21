const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const sectorialController = require("../controllers/sectorialController");
router.use(auth);

router.get("/", sectorialController.index);

module.exports = router;

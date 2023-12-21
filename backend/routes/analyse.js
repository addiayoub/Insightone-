const express = require("express");
const router = express.Router();
const analyseController = require("../controllers/analyseController");
const auth = require("../middlewares/auth");
router.use(auth);

router.get("/", analyseController.index);
router.get("/getTitres", analyseController.getTitres);

module.exports = router;

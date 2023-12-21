const express = require("express");
const router = express.Router();
const opcvmController = require("../controllers/opcvmController");
const auth = require("../middlewares/auth");

router.use(auth);
router.get("/", opcvmController.index);
router.get("/getSocietesGestion", opcvmController.getSocietesGestion);
router.get("/getChartData", opcvmController.getChartData);

module.exports = router;

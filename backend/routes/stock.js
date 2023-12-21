const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockController");
const auth = require("../middlewares/auth");
router.use(auth);

router.get("/getCapitalisationData", stockController.getCapitalisationData);
router.get("/stockChartData", stockController.stockChartData);
router.get("/allQueries", stockController.allQueries);
router.get("/getSliderData", stockController.getSliderData);

module.exports = router;

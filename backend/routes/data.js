const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");
const auth = require("../middlewares/auth");

router.use(auth);
router.get("/", dataController.index);
router.get("/getFields", dataController.getFields);
router.post("/", dataController.store);
router.delete("/", dataController.destroy);
router.get("/getData", dataController.getData);
router.get("/getSecteurs", dataController.getSecteurs);
router.get("/all", dataController.allData);
router.get("/getDataWithContraints", dataController.getDataWithContraints);
router.get("/getChartData", dataController.getChartData);
router.get("/getIndices", dataController.getIndices);
router.get("/getIndicesChart", dataController.getIndicesChart);
router.get("/getComparaison", dataController.getComparaison);
router.get("/getFirstGraph", dataController.getFirstGraph);
router.get("/getRendementRisqueData", dataController.getRendementRisqueData);
router.get("/getTitres", dataController.getTitres);
router.get("/getTitresWithReference", dataController.getTitresWithReference);

router.get("/test", dataController.test);
router.get("/getPoids", dataController.getPoids);
module.exports = router;

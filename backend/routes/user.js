const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

router.use(auth);
router.get("/", isAdmin, userController.index);
router.post("/", isAdmin, userController.store);
router.delete("/:id", isAdmin, userController.delete);
router.put("/:id", isAdmin, userController.update);
router.get("/:username", isAdmin, userController.show);
router.post("/savePortefeuille", userController.savePortefeuille);
router.put("/:id/update-infos", userController.updateProfile);

router.delete("/", userController.deleteAll);
module.exports = router;

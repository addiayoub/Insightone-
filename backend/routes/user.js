const express = require("express");
const router = express.Router();
const userController = require("../controllers/userCotroller");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

router.use(auth, isAdmin);
router.get("/", userController.index);
router.post("/", userController.store);
router.delete("/:id", userController.delete);
router.put("/:id", userController.update);
router.get("/:username", userController.show);
router.put("/:id/update-infos", userController.updateProfile);

router.delete("/", userController.deleteAll);
module.exports = router;

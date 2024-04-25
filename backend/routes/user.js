const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }

    if (!fs.existsSync("public/csv")) {
      fs.mkdirSync("public/csv");
    }

    cb(null, "public/csv");
  },
  filename: function (req, file, cb) {
    const fileName = path.parse(file.originalname).name;
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

const imgStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }

    if (!fs.existsSync("public/images")) {
      fs.mkdirSync("public/images");
    }

    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const fileName = path.parse(file.originalname).name;
    cb(null, Date.now() + file.originalname);
  },
});
const imgUpload = multer({ storage: imgStorage });
// /api/users
router.use(auth);
router.get("/", isAdmin, userController.index);
router.post("/", isAdmin, userController.store);
router.delete("/:id", isAdmin, userController.delete);
router.put(
  "/update-infos",
  imgUpload.single("pic"),
  userController.updateProfile
);
router.put("/:id", isAdmin, userController.update);
router.get("/getPortefeuilles", userController.getPortefeuilles);
router.get("/comparePortefeuilles", userController.comparePortefeuilles);
router.post("/deletePortefeuilles", userController.deletePortefeuilles);
router.post("/updatePortefeuilles", userController.updatePortefeuilles);
router.get("/:username", isAdmin, userController.show);
router.post("/savePortefeuille", userController.savePortefeuille);
router.post("/uploadCSV", upload.single("file"), userController.uploadCSV);
router.post("/uploadTable", userController.uploadTable);
router.delete("/", userController.deleteAll);
module.exports = router;

const express = require("express");
const router = express.Router();
const compOpcvmController = require("../controllers/compositionOpcvmController");
const auth = require("../middlewares/auth");
router.use(auth);

router.get("/", compOpcvmController.index);
router.get("/note-information", compOpcvmController.getNoteInformation);

module.exports = router;

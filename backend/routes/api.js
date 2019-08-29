const router = require("express").Router();
const { files } = require("../controllers/api");

router.get("/files", files.get);
// router.post("files")

module.exports = router;
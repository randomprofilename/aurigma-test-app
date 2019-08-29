const router = require("express").Router();
const { content, file } = require("../controllers/api");

router.get("/content", content.get);
router.get("/file", file.get);
router.post("/file", file.post);

module.exports = router;
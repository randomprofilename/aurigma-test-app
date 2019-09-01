const router = require("express").Router();
const { content, file } = require("../controllers/api");

router.get("/content", content.get);
router.delete("/content", content.delete);

router.get("/file", file.get);
router.post("/file", file.post);
router.delete("/file", file.delete);

module.exports = router;
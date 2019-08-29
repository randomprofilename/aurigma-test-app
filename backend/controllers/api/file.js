const { readFile } = require("../../modules/fileManager");

module.exports.get = (req, res, next) => {
  const { subdir, filename, preview = false } = req.query;

  try {
    const file = readFile(filename, subdir);
    const fileExtension = filename.split(".").pop();
    if (!preview)
      res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.type(fileExtension).send(file);
  } catch (err) {
    next(err)
  }
};


module.exports.post = (req, res, next) => {
  console.log(req.body)

  res.json({ message: "Ok" });
};
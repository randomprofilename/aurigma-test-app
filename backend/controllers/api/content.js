const { readDirectory, removeDirectory } = require("../../modules/fileManager");

module.exports.get = (req, res, next) => {
  const { subdir } = req.query;
  try {
    const directoryContent = readDirectory(subdir);
    res.json({ data: directoryContent }); 
  } catch (err) {
    next(err);
  }
};

module.exports.delete = (req, res, next) => {
  const { subdir } = req.query;
  try {
    removeDirectory(subdir);
    res.json({ message: "Ok" });
  } catch (err) {
    next(err);
  }
}
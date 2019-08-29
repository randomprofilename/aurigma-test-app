const { readDirectory } = require("../../modules/fileManager");

module.exports.get = (req, res, next) => {
  const { subdir } = req.query;
  try {
    const directoryContent = readDirectory(subdir);
    res.json({ data: directoryContent }); 
  } catch (err) {
    next(err);
  }
};
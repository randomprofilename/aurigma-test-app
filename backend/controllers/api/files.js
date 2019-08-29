const { readDirectory } = require("../../modules/fileManager");

module.exports.get = (req, res, next) => {
  try {
    res.json({ message: "Ok" }); 
  } catch (err) {
    next(err);
  }
};
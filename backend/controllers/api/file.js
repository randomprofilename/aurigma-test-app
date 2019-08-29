const { readFile, writeFile } = require("../../modules/fileManager");

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


module.exports.post = async (req, res, next) => {
  try {
    const { files, fields } = req;
    const { subdir } = fields;
    const [ file ] = Object.keys(files);
    const tempfilePath = files[file].path;

    writeFile(file, tempfilePath, subdir);
    res.json({ message: "Ok" });
  } catch (err) {
    next(err); 
  }
};
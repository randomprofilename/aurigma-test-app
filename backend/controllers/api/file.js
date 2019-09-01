const { readFile, writeFile, deleteFile } = require("../../modules/fileManager");

module.exports.get = (req, res, next) => {
  const { subdir, filename, preview = "false" } = req.query;

  try {
    const file = readFile(filename, subdir);
    const fileExtension = filename.split(".").pop();
    if (preview == "false")
      res.setHeader("Content-disposition", `attachment;filename=${filename}`);
      
    res.type(fileExtension).send(file);
  } catch (err) {
    next(err)
  }
};

module.exports.post = async (req, res, next) => {
  try {
    const { files, fields } = req;
    const { subdir } = fields;
    Object.values(files).forEach(file => {
      const tempfilePath = file.path;
      const filename = file.name;
      writeFile(filename, tempfilePath, subdir);
    });

    res.json({ message: `Files ${Object.keys(files).map(file => file.name).join(",")} was uploaded to ${subdir}` });
  } catch (err) {
    next(err); 
  }
};
module.exports.delete = async (req, res, next) => {
  try {
    const { subdir, filename } = req.query;

    deleteFile(filename, subdir);
    res.json({ message: `File ${filename} is deleted from ${subdir}` });
  } catch (err) {
    next(err); 
  }
};
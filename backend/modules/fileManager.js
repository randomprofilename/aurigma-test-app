const fs = require("fs");
const { workingDirectory } = require("../web.config");

const getFileDetailedInfo = (subDirectory, filename) => {
  const currentDirectory = workingDirectory + subDirectory;
  const { birthtime: createdTime, mtime: lastModified, size } = fs.statSync(`${currentDirectory}/${filename}`);
  return { createdTime, lastModified, size };
};

const readDirectory = (subDirectory = "") => {
  const currentDirectory = workingDirectory + subDirectory;

  const directoryContent = fs.readdirSync(currentDirectory, { withFileTypes: true })
    .map(el => ({ name: el.name, type: el.isDirectory() ? "folders" : "files" }))
    .reduce((acc, el) => ({ ...acc, [el.type]: [ ...acc[el.type], { name: el.name } ] }), { folders: [], files: [] });

    directoryContent.files = directoryContent.files.map(({ name }) => ({ name, ...getFileDetailedInfo(subDirectory, name) }) )
  return directoryContent;
};

const readFile = (filename, subDirectory = "") => {
  const filepath = `${workingDirectory + subDirectory}/${filename}`;

  return fs.readFileSync(filepath);
};

const writeFile = (filename, tempfilePath, subDirectory = "") => {
  const currentDirectory = workingDirectory + subDirectory;
  if (!fs.existsSync(currentDirectory))
    fs.mkdirSync(currentDirectory, { recursive: true });

  fs.renameSync(tempfilePath, `${currentDirectory}/${filename}`);  
};

const deleteFile = (filename, subDirectory = "") => {
  const currentDirectory = workingDirectory + subDirectory;
  fs.unlinkSync(`${currentDirectory}/${filename}`);
};

const removeDirectory = subDirectory => {
  if (!subDirectory)
    throw new Error("Subdirectory param cannot be empty");

  const currentDirectory = workingDirectory + subDirectory;
  fs.rmdirSync(currentDirectory);
};

const watcher = callback => //(eventType, filename) => console.log(`${eventType} ${filename}`
  fs.watch(workingDirectory,{ recursive: true }, callback);

module.exports = { readDirectory, readFile, writeFile, deleteFile, removeDirectory, watcher };
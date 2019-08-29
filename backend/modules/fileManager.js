const fs = require("fs");
const { workingDirectory } = require("../config");

const getFileDetailedInfo = (subDirectory, filename) => {
  const currentDirectory = workingDirectory + subDirectory;
  const { birthtime: createdTime, mtime: lastModified, size } = fs.statSync(`${currentDirectory}/${filename}`);
  return { createdTime, lastModified, size };
};

const readDirectory = (subDirectory = "") => {
  const currentDirectory = workingDirectory + subDirectory;

  const directoryContent = fs.readdirSync(currentDirectory, { withFileTypes: true })
    .map(el => ({ name: el.name, type: el.isDirectory() ? "directories" : "files" }))
    .reduce((acc, el) => ({ ...acc, [el.type]: [ ...acc[el.type], { name: el.name } ] }), { directories: [], files: [] });

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

module.exports = { readDirectory, readFile, writeFile };
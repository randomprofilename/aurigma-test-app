const fs = require("fs");
const { workingDirectory } = require("../config");

const getFileDetailedInfo = (currentDirectory, filename) => {
  const { birthtime: createdTime, mtime: lastModified, size } = fs.statSync(`${currentDirectory}/${filename}`);
  return { createdTime, lastModified, size };
};

const readDirectory = (subDirectory = "") => {
  const currentDirectory = workingDirectory + subDirectory;

  const directoryContent = fs.readdirSync(currentDirectory, { withFileTypes: true })
    .map(el => ({ name: el.name, type: el.isDirectory() ? "directories" : "files" }))
    .reduce((acc, el) => ({ ...acc, [el.type]: [ ...acc[el.type], { name: el.name } ] }), { directories: [], files: [] });

    directoryContent.files = directoryContent.files.map(({ name }) => ({ name, details: getFileDetailedInfo(currentDirectory, name)}) )
  return directoryContent;
};

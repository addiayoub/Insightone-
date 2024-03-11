const fs = require("fs");
const path = require("path");

const checkFileExists = (folder, filename) => {
  const filePath = path.join(__dirname, `../public/${folder}`, filename); // Adjust the path accordingly
  console.log("filePath", filePath);
  try {
    // Check if the file exists
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = checkFileExists;

const fs = require("fs");
const removeFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      throw err;
    }
  });
};
module.exports = removeFile;

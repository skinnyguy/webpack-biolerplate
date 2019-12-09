const fs = require('fs')
const path = require('path')

module.exports = {
  _extractPath: (dir, fileTypes) => {
    const _files = []

    function writeDir(currentPath) {
      const files = fs.readdirSync(currentPath)

      for (let key in files) {
        const currentFile = path.join(currentPath, files[key])

        if (fs.statSync(currentFile).isFile() && fileTypes.indexOf(path.extname(currentFile)) !== -1) {
          _files.push(currentFile)
        } else if (fs.statSync(currentFile).isDirectory()) {
          writeDir(currentFile)
        }
      }
    }

    writeDir(dir)
    return _files
  }
}

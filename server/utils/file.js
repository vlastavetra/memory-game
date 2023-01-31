var fs = require('fs').promises;
var path = require('path');
var url = require('url');
var onError = require('./onError.js');

var _dirname = path.dirname(url.fileURLToPath(url.pathToFileURL(__filename).href));

var fileDir = path.join(_dirname, '../files');

module.exports = {
getFilePath: function (filePath) {
return path.join(fileDir, filePath);
},
removeFile: async function (filePath) {
try {
await fs.unlink(path.join(fileDir, filePath));
} catch (e) {
onError(e);
}
}
};
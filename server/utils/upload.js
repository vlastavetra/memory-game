const fs = require('fs');
const multer = require('multer');
const path = require('path');
const url = require('url');

const dirname = path.dirname(__filename);

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const roomId = req.headers['x-room-id'];
      const dirPath = path.join(dirname, '../files', roomId);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      cb(null, dirPath);
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    }
  })
});

module.exports = upload;

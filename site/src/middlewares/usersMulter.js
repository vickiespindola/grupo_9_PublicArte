const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/img/users')
    },
    filename: function (req, file, callback) {
        callback(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
    }
});

const fileFilter = function (req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
        req.fileValidationError = "Solo se permite imágenes";
        return callback(null, false, req.fileValidationError);
    }
    callback(null, true);
}

const uploadFile = multer({
    storage,
    fileFilter
});

module.exports = uploadFile;
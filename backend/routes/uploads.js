const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // 10MB limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('resource'); // 'resource' is the name of the input field in the form

// Check file type
function checkFileType(file, cb) {
    // Allowed extensions
    const filetypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images and Documents Only!');
    }
}

// @route   POST api/upload
// @desc    Upload a file
// @access  Public
router.post('/', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).json({ msg: err });
        } else {
            if (req.file == undefined) {
                res.status(400).json({ msg: 'Error: No File Selected!' });
            } else {
                res.json({
                    msg: 'File Uploaded!',
                    file: `uploads/${req.file.filename}`
                });
            }
        }
    });
});

module.exports = router; 
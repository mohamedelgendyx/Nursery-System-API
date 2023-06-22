const multer = require('multer');
const express = require('express');

// storing files to disk.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${Math.floor(Math.random() * 1E9)}_${file.originalname}`
        cb(null, fileName);
    }
})

module.exports = multer({ storage }).single('image');


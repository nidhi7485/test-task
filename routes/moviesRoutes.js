const express = require('express')
const multer = require('multer')
const csv = require('csv-parser')

const router = express.Router()

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
// Create Multer upload instance
const upload = multer({ storage })
const insertMovies = require('../controller/moviesController')
const insertRating = require('../controller/ratingController')

router.post('/upload-movies', upload.single('file'), insertMovies)
router.post('/upload-ratings', upload.single('file'), insertRating)
module.exports = router

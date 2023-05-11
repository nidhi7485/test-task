const express = require('express')

const router = express.Router()
const {
  getLongestMovie,
  insertNewMovies,
  topRatedMovies,
  genereMoviewithSubtotals,
} = require('../controller/allApisContoller')

router.get('/longest-duration-movies', getLongestMovie)
router.post('/new-movie', insertNewMovies)
router.get('/top-rated-movies', topRatedMovies)
router.get('/genre-movies-with-subtotals', genereMoviewithSubtotals)
module.exports = router

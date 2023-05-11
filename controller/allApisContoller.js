const Movies = require('../model/Movies')
const Rating = require('../model/Rating')

const getLongestMovie = async (req, res) => {
  try {
    const longestMovies = await Movies.find()
      .sort({ runtimeMinutes: -1 })
      .limit(10)
      .select('tconst primaryTitle runtimeMinutes genres')
    res.json({ longestMovies, total: longestMovies.length })
  } catch (error) {
    console.log(error)
    res.send({ msg: error.message })
  }
}
const insertNewMovies = async (req, res) => {
  try {
    const { tconst, titleType, primaryTitle, runtimeMinutes, genres } = req.body
    console.log(tconst, titleType, primaryTitle, runtimeMinutes, genres)
    const movies = await Movies.create({
      tconst: tconst,
      titleType: titleType,
      primaryTitle: primaryTitle,
      runtimeMinutes: runtimeMinutes,
      genres: genres,
    })
    res.json({ msg: 'success' })
  } catch (error) {
    res.send({ msg: error.message })
  }
}
const topRatedMovies = async (req, res) => {
  try {
    const topRating = await Rating.find({
      averageRating: { $gt: 6.0 },
    })
      .sort({ averageRating: 1 })
      .exec()
    let rating = topRating.map((rate) => rate.tconst)
    let movie = []
    for (const element of rating) {
      const data = await Movies.find({ tconst: element }).select(
        'tconst primaryTitle genres'
      )
      movie.push(data)
    }
    movie = movie.flat()

    res.json({ movie })
  } catch (error) {
    res.send({ msg: error.message })
  }
}

const genereMoviewithSubtotals = async (req, res) => {
  try {
    const gMovie = await Movies.find().select(
      'tconst primaryTitle runtimeMinutes genres'
    )
    const subtotals = await Rating.find().select('tconst numVotes')
    for (var i = 0; i < gMovie.length - 1; i++) {
      if (subtotals[i].tconst === gMovie[i].tconst) {
        // console.log(subtotals.length, gMovie.length)
        gMovie[i].numVotes = subtotals[i].numVotes
      }
    }
    res.json({ gMovie })
    // console.log()
  } catch (error) {
    res.send({ msg: error.message })
  }
}
module.exports = {
  getLongestMovie,
  insertNewMovies,
  topRatedMovies,
  genereMoviewithSubtotals,
}

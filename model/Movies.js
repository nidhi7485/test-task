const mongoose = require('mongoose')

const moviesSchema = new mongoose.Schema({
  tconst: {
    type: String,
    required: true,
  },
  titleType: {
    type: String,
    required: true,
  },
  primaryTitle: {
    type: String,
    required: true,
  },
  runtimeMinutes: {
    type: Number,
    required: true,
  },
  genres: {
    type: String,
  },
})
module.exports = mongoose.model('Movies', moviesSchema)

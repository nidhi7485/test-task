const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({
  tconst: { type: String },
  averageRating: { type: Number },
  numVotes: { type: Number },
})

module.exports = mongoose.model('Rating', ratingSchema)

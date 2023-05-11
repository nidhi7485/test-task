const Rating = require('../model/Rating')
const csv = require('csv-parser')
const fs = require('fs')

const insertRating = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'no file uploaded' })
    }
    const filePath = req.file.path
    if (!filePath.endsWith('.csv')) {
      return res.status(400).json({ msg: 'uploaded file is not csv' })
    }
    const data = []
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        data.push(row)
      })
      .on('end', async () => {
        try {
          await Rating.deleteMany()
          await Rating.insertMany(data)
          res.status(200).json({ msg: 'inserted successfully' })
        } catch (error) {
          console.log(error)
          res.status(500).json({ msg: 'error is occured while inserting data' })
        }
      })
  } catch (error) {
    res.send({ msg: error.message })
  }
}

module.exports = insertRating

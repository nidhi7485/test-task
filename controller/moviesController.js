const Movies = require('../model/Movies')
const csv = require('csv-parser')
const fs = require('fs')

const insertMovies = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }
    const filePath = req.file.path
    // console.log(filePath)
    if (!filePath.endsWith('.csv')) {
      return res.status(400).json({ error: 'Uploaded file is not a CSV' })
    }
    const data = []
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        data.push(row)
      })
      .on('end', async () => {
        try {
          await Movies.deleteMany()
          await Movies.insertMany(data)
          res.json({ message: 'Data inserted successfully' })
        } catch (err) {
          console.error(err)
          res
            .status(500)
            .json({ error: 'An error occurred while inserting data' })
        } finally {
          // Delete the uploaded file after processing
          fs.unlinkSync(filePath)
        }
      })
  } catch (error) {
    res.send({ msg: error.message })
  }
}
module.exports = insertMovies

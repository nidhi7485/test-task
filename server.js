require('dotenv').config()
const express = require('express')
const app = express()

const port = process.env.PORT || 5000

// db
const connectDB = require('./db/connect')
// router
const moviesRouter = require('./routes/moviesRoutes')
const apiRouter = require('./routes/apisRoute')
// middleware
app.use(express.json())
app.use('/', moviesRouter)
app.use('/api/v1', apiRouter)
const start = () => {
  connectDB(process.env.MONGO_URI)
  app.listen(port, console.log(`server is running on port ${port}`))
}

start()

// Import packages
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const books = require('./routes/books')

// Middlewares
const app = express()
app.use(express.json())
app.use(cors())

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('MongoDBga ulanish hosil qilindi...')
	})
	.catch(error => {
		console.log("MongoDBga ulanishda xatolik ro'y berdi", error)
	})

// home
app.get('/', (req, res) => {
	res.send('Owa-books is runing')
})

// Routes
app.use('/api/books', books)

// connection
const port = process.env.PORT || 9001
app.listen(port, () => console.log(`Listening to port ${port}`))

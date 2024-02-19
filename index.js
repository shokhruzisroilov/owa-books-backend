require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const booksRouter = require('./routes/books')

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

app.get('/', (req, res) => {
	res.send('Owa-books is runing')
})

app.use('/api/books', booksRouter)

const port = process.env.PORT || 3000

app.listen(port, () => {
	console.log(`Connect runing on port ${port}`)
})

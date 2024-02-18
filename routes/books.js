const express = require('express')
const mongoose = require('mongoose')
const Joi = require('joi')
const route = express.Router()

mongoose
	.connect('mongodb://localhost/owa')
	.then(() => {
		console.log('MongoDBga ulanish hosil qilindi...')
	})
	.catch(err => {
		console.log("MongoDBga ulanishda xatolik ro'y berdi", err)
	})

const bookSchema = new mongoose.Schema({
	title: String,
	description: String,
	author: String,
	aboutAuthor: String,
	createdAt: { type: Date, default: Date.now },
	rate: Number,
	img: String,
	like: Boolean,
	editionNumber: String,
	curentlyReading: Number,
	haveRead: Number,
})

const Book = mongoose.model('books', bookSchema)

// All Books
route.get('/', async (req, res) => {
	try {
		const books = await Book.find()
		res.send(books)
	} catch (error) {
		res.status(500).send('Server xatosi')
	}
})

// Create Book
route.post('/', async (req, res) => {
	const { error } = validateBook(req.body)
	if (error) {
		return res.status(400).send(error.details[0].message)
	}
	try {
		const book = new Book({
			title: req.body.title,
			description: req.body.description,
			author: req.body.author,
			aboutAuthor: req.body.aboutAuthor,
			rate: req.body.rate,
			img: req.body.img,
			like: req.body.like,
			editionNumber: req.body.editionNumber,
			curentlyReading: req.body.curentlyReading,
			haveRead: req.body.haveRead,
		})

		const savedBook = await book.save()
		res.status(201).send(savedBook)
	} catch (error) {
		console.error('Error creating book:', error)
		res.status(500).send('Internal Server Error')
	}
})

// Get Book Id
route.get('/:bookId', async (req, res) => {
	try {
		const book = await Book.findById(req.params.bookId)
		if (!book) {
			return res.status(404).send('Berilgan Idga teng kitob topilmadi')
		}
		return res.send(book)
	} catch (error) {
		return res.status(500).send('Server xatosi')
	}
})

// Like Book
route.get('/like/:bookId', async (req, res) => {
	const book = await Book.findById(req.params.bookId)
	if (!book) {
		return res.status(404).send('Tanlangan Idga teng kitob topilmadi')
	}
	book.like = !book.like
	await book.save()
	return res.send(book)
})

// Update Book
route.put('/:bookId', async (req, res) => {
	const { error } = validateBook(req.body)
	if (error) {
		return res.status(400).send(error.details[0].message)
	}
	try {
		const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
			new: true,
		})
		if (!book) {
			return res.status(404).send('Berilgan Idga teng kitob topilmadi')
		}
		return res.send(book)
	} catch (error) {
		return res.status(500).send('Server xatosi')
	}
})

// Delete Book
route.delete('/:bookId', async (req, res) => {
	try {
		const book = await Book.findByIdAndDelete(req.params.bookId)
		if (!book) {
			return res.status(404).send("Berilgan IDga teng bo'lgan kitob topilmadi")
		}
		res.send(book)
	} catch (error) {
		res.status(500).send(error.message)
	}
})

function validateBook(book) {
	const bookSchema = Joi.object({
		title: Joi.string().required().min(5).max(50),
		description: Joi.string().required().min(20),
		author: Joi.string().required().min(3).max(15),
		aboutAuthor: Joi.string().required().min(10),
		createdAt: Joi.number().required(),
		rate: Joi.number().required(),
		img: Joi.string().required(),
		like: Joi.boolean().required(),
		editionNumber: Joi.string().required().min(1),
		curentlyReading: Joi.number().required(),
		haveRead: Joi.number().required(),
	})
	return bookSchema.validate(book)
}

module.exports = route

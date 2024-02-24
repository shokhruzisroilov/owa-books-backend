const express = require('express')
const Joi = require('joi')
const OwaBooks = require('../models/Books')

const router = express.Router()

// Create Book
router.post('/', async (req, res) => {
	const { error } = validateBook(req.body)
	if (error) {
		return res.status(400).send(error.details[0].message)
	}
	try {
		const book = new OwaBooks({
			title: req.body.title,
			description: req.body.description,
			author: req.body.author,
			aboutAuthor: req.body.aboutAuthor,
			rate: req.body.rate,
			img: req.body.img,
			like: req.body.like,
			editionNumber: req.body.editionNumber,
			currentlyReading: req.body.currentlyReading,
			haveRead: req.body.haveRead,
		})
		const bookSave = await book.save()
		res.status(201).send(bookSave)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Server Error' })
	}
})

// Get All Books
router.get('/', async (req, res) => {
	try {
		const books = await OwaBooks.find().sort({ _id: -1 })
		res.status(200).json(books)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Server Error' })
	}
})

// One id book
router.get('/:bookId', async (req, res) => {
	try {
		const book = await OwaBooks.findById(req.params.bookId)
		if (!book) {
			return res.status(404).send('No book found matching the given ID')
		}
		res.send(book)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Server Error' })
	}
})

// Update Books
router.put('/:bookId', async (req, res) => {
	const { error } = validateBook(req.body)
	if (error) {
		return res.status(400).send(error.details[0].message)
	}
	try {
		const book = await OwaBooks.findByIdAndUpdate(req.params.bookId, req.body, {
			new: true,
		})
		if (!book) {
			return res.status(404).send('No book found matching the given ID')
		}
		res.send(book)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Server Error' })
	}
})

// Delete Books
router.delete('/:bookId', async (req, res) => {
	try {
		const book = await OwaBooks.findByIdAndDelete(req.params.bookId)
		if (!book) {
			return res
				.status(404)
				.json({ error: 'No book found matching the given ID' })
		}
		res.send(book)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Server Error' })
	}
})

// Like Books
router.get('/like/:bookId', async (req, res) => {
	try {
		const book = await OwaBooks.findById(req.params.bookId)
		if (!book) {
			return res
				.status(404)
				.json({ error: 'No book found matching the given ID' })
		}
		book.like = !book.like
		await book.save()
		res.send('Succes like')
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Server Error' })
	}
})

// Validate Book
function validateBook(book) {
	const bookSchema = Joi.object({
		title: Joi.string().required().min(3).max(50),
		description: Joi.string().required(),
		author: Joi.string().required().min(2).max(15),
		aboutAuthor: Joi.string().required(),
		rate: Joi.number().integer().min(1).max(5).required(),
		img: Joi.string().uri().required(),
		like: Joi.boolean().required(),
		editionNumber: Joi.string().required(),
		currentlyReading: Joi.number().integer().required(),
		haveRead: Joi.number().integer().min(0).required(),
	})
	return bookSchema.validate(book)
}

module.exports = router

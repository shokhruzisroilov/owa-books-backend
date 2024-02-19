const express = require('express')
const Joi = require('joi')
const OwaBooks = require('../models/Books')

const router = express.Router()

// Get All Books
router.get('/', async (req, res) => {
	try {
		const books = await OwaBooks.find()
		res.status(200).json(books)
	} catch (error) {
		console.log(error.message)
		res.status(500).send('Server Error')
	}
})

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
		console.log(error.message)
		res.status(500).send('Server Error')
	}
})

// Validate Book
function validateBook(book) {
	const bookSchema = Joi.object({
		title: Joi.string().required(),
		description: Joi.string().required(),
		author: Joi.string().required(),
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

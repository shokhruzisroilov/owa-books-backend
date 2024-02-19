const express = require('express')
const OwaBooks = require('../models/Books')

const router = express.Router()

router.post('/', async (req, res) => {
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
		console.error('Error:', error.message)
		res.status(500).send(error.message)
	}
})

module.exports = router

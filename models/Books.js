const mongoose = require('mongoose')
const Schema = mongoose.Schema
// Mongodb schema
const owaBooksSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	author: { type: String, required: true },
	aboutAuthor: { type: String },
	createdAt: { type: Date, default: Date.now },
	rate: { type: Number, min: 0, max: 5 },
	img: { type: String },
	like: { type: Boolean, default: false },
	editionNumber: { type: String },
	currentlyReading: { type: Number },
	haveRead: { type: Number },
})

// Model
module.exports = OwaBooks = mongoose.model('books', owaBooksSchema)

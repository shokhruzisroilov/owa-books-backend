const express = require('express')
const Joi = require('joi')
const route = express.Router()

const books = [
	{
		id: 1,
		title: 'Don’t make me think',
		description:
			"Steve Krug is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design. Steve Krug is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design. Steve Krug is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design. Steve Krug is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design.",
		author: 'Steve Krug',
		aboutAuthor:
			"Steve Krug is a UX professional from Chestnut Hill, Massachusetts. He is best known for his book Don't Make Me Think About Human-Computer Interaction and the Usability of the Internet, third edition with over 600,000 copies.",
		createdAt: 2000,
		rate: 3,
		img: 'https://owabooks.netlify.app/img/make-me-think.png',
		like: true,
		editionNumber: 'First Edition',
		curentlyReading: 13,
		haveRead: 250,
	},
	{
		id: 2,
		title: 'The Design of Everyday things',
		description:
			"Don Norman is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design. Steve Krug is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design. Steve Krug is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design. Steve Krug is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design.",
		author: 'Don Norman',
		aboutAuthor:
			'Donald Arthur Norman is an American psychologist, specialist in cognitivism, design and user engineering, teacher, souchreditel and consultant Nielsen Norman Group, author of the book The Design of Everyday Things, Emotional Design and Living with Complexity.',
		createdAt: 1988,
		rate: 3,
		img: 'https://owabooks.netlify.app/img/design-everyday.png',
		like: true,
		editionNumber: 'Second Edition',
		curentlyReading: 25,
		haveRead: 133,
	},
	{
		id: 3,
		title: 'Rich Dad Poor Dad',
		description:
			"Robert Kiyosaki is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design. Steve Krug is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design. Steve Krug is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design. Steve Krug is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design.",
		author: 'Robert T.Kiyosaki',
		aboutAuthor:
			'Robert Kiyosaki is an American entrepreneur, investor, author, and motivational speaker. He is the author of several books on investing, including the bestseller Rich Dad Poor Dad. Financial Explorer on Yahoo Finance',
		createdAt: 1997,
		rate: 5,
		img: 'https://owabooks.netlify.app/rich-dad-poor-dad.png',
		like: false,
		editionNumber: 'Third Edition',
		curentlyReading: 18,
		haveRead: 156,
	},
	{
		id: 4,
		title: 'Sprint : Solve Big Problems',
		description:
			"Robert Kiyosaki is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design. Steve Krug is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design. Steve Krug is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design. Steve Krug is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design",
		author: 'Jake Knapp',
		aboutAuthor:
			'Jake Knapp is the inventor of the Design Sprint and a New York Times bestselling author. Previously, Jake built products like Microsoft Encarta and Gmail and co-founded Google Meet.',
		createdAt: 2000,
		rate: 5,
		img: 'https://owabooks.netlify.app/img/sprint.png',
		like: false,
		editionNumber: 'Second Edition',
		curentlyReading: 18,
		haveRead: 165,
	},
	{
		id: 5,
		title: 'Learn UX : Design Great Products',
		description:
			"Jeff Gothelf is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design. Steve Krug is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design. Steve Krug is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design. Steve Krug is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design",
		author: 'Jeff Gothelf',
		aboutAuthor:
			'Jake Knapp is the inventor of the Design Sprint and a New York Times bestselling author. Previously, Jake built products like Microsoft Encarta and Gmail and co-founded Google Meet.',
		createdAt: 2016,
		rate: 3,
		img: 'https://owabooks.netlify.app/img/learnUX.png',
		like: false,
		editionNumber: 'Second Edition',
		curentlyReading: 15,
		haveRead: 285,
	},
	{
		id: 6,
		title: 'The Road to React',
		description:
			"Robin Wieruch is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design. Steve Krug is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design. Steve Krug is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design. Steve Krug is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design",
		author: 'Robin Wieruch',
		aboutAuthor:
			'Robin Wieruch is a software engineer, author, and blogger who specializes in modern JavaScript technologies. He is the author of several popular books on JavaScript and its related frameworks, including The Road to React, The Road to GraphQL, an The Road to Firebase.',
		createdAt: 2022,
		rate: 5,
		img: 'https://owabooks.netlify.app/img/to-road-react.png',
		like: false,
		editionNumber: 'Second Edition',
		curentlyReading: 15,
		haveRead: 285,
	},
	{
		id: 7,
		title: 'Harry Potter and The Philosopher stone',
		description:
			"J. K. Rowling is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design. Steve Krug is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design. Steve Krug is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design. Steve Krug is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design",
		author: 'J. K. Rowling',
		aboutAuthor:
			"J.K. Rowling is a British author, best known for writing the immensely popular Harry Potter series. Born in in Yate, England, Rowling started writing the first book in the series, Harry Potter and the Philosopher's Stone (known as Harry Potter and the Sorcerer's Stone in the United States), while living in poverty as a single mother.",
		createdAt: 2002,
		rate: 5,
		img: 'https://owabooks.netlify.app/img/philosopher-stone.png',
		like: false,
		editionNumber: 'Second Edition',
		curentlyReading: 65,
		haveRead: 395,
	},
	{
		id: 8,
		title: 'You Don’t Know JS: Scope and Closure',
		description:
			"Kyle Simpson is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design. Steve Krug is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design. Steve Krug is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design. Steve Krug is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design",
		author: 'Kyle Simpson',
		aboutAuthor:
			"Kyle Simpson, also known as getify online, is a well-known JavaScript developer, teacher, and author. He is the author of the popular You Don't Know JS book series, which provides an in-depth look at the often misunderstood and complex parts of the JavaScript language.",
		createdAt: 2014,
		rate: 4,
		img: 'https://owabooks.netlify.app/img/scopes&closures.png',
		like: false,
		editionNumber: 'Third Edition',
		curentlyReading: 32,
		haveRead: 180,
	},
	{
		id: 9,
		title: 'Rocket Surgery Made Easy',
		description:
			"Steve Krug is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design. Steve Krug is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design. Steve Krug is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design. Steve Krug is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design",
		author: 'Steve Krug',
		aboutAuthor:
			"Steve Krug is a UX professional from Chestnut Hill, Massachusetts. He is best known for his book Don't Make Me Think About Human-Computer Interaction and the Usability of the Internet, third edition with over 600,000 copies.",
		createdAt: 2001,
		rate: 5,
		img: 'https://owabooks.netlify.app/img/rocket-surgery-made-easy.png',
		like: false,
		editionNumber: 'First Edition',
		curentlyReading: 28,
		haveRead: 120,
	},
	{
		id: 10,
		title: 'The Practice of Creativity',
		description:
			"Steve Krug is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design. Steve Krug is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design. Steve Krug is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design. Steve Krug is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design",
		author: 'Steve Krug',
		aboutAuthor:
			"Steve Krug is a UX professional from Chestnut Hill, Massachusetts. He is best known for his book Don't Make Me Think About Human-Computer Interaction and the Usability of the Internet, third edition with over 600,000 copies.",
		createdAt: 1999,
		rate: 4,
		img: 'https://owabooks.netlify.app/img/creativity.png',
		like: false,
		editionNumber: 'Second Edition',
		curentlyReading: 5,
		haveRead: 80,
	},
]

// All Books
route.get('/', (req, res) => {
	res.send(books)
})

// Create Book
route.post('/', (req, res) => {
	const { error } = validateBook(req.body)
	if (error) {
		return res.status(400).send(error.details[0].message)
	}
	const book = {
		id: books.length + 1,
		title: req.body.title,
		description: req.body.description,
		author: req.body.author,
		aboutAuthor: req.body.aboutAuthor,
		createdAt: req.body.createdAt,
		rate: req.body.rate,
		img: req.body.img,
		like: req.body.like,
		editionNumber: req.body.editionNumber,
		curentlyReading: req.body.curentlyReading,
		haveRead: req.body.haveRead,
	}
	books.unshift(book)
	res.status(201).send(book)
})

// Get Book Id
route.get('/:bookId', (req, res) => {
	const book = books.find(b => b.id === parseInt(req.params.bookId))
	if (!book) {
		return res.status(404).send('Berilgan Idga teng kitob topilmadi')
	} else {
		return res.send(book)
	}
})

// Like Book
route.get('/like/:bookId', (req, res) => {
	const book = books.find(b => b.id === parseInt(req.params.bookId))
	if (!book) {
		return res.status(404).send('Tanlangan Idga teng kitob topilmadi')
	} else {
		book.like = !book.like
		return res.send(books)
	}
})

// Update Book
route.put('/:bookId', (req, res) => {
	const { error } = validateBook(req.body)
	if (error) {
		return res.status(400).send(error.details[0].message)
	}
	const book = books.find(b => b.id === parseInt(req.params.bookId))
	if (!book) {
		return res.status(404).send('Berilgan Idga teng kitob topilmadi')
	}
	book.title = req.body.title
	book.description = req.body.description
	book.author = req.body.author
	book.aboutAuthor = req.body.aboutAuthor
	book.createdAt = req.body.createdAt
	book.rate = req.body.rate
	book.img = req.body.img
	book.like = req.body.like
	book.editionNumber = req.body.editionNumber
	book.curentlyReading = req.body.curentlyReading
	book.haveRead = req.body.haveRead

	res.send(book)
})

// Delete Book
route.delete('/:bookId', (req, res) => {
	const book = books.find(b => b.id === parseInt(req.params.bookId))
	if (!book) {
		return res.status(404).send('Berilgan IDga teng bolgan kitob topilmadi')
	}
	const bookIndex = books.indexOf(book)
	books.splice(bookIndex, 1)

	res.send(book)
})

function validateBook(book) {
	const bookSchema = Joi.object({
		title: Joi.string().required().min(5).max(50),
		description: Joi.string().required().min(20).max(300),
		author: Joi.string().required().min(3).max(50),
		aboutAuthor: Joi.string().required().min(10).max(200),
		createdAt: Joi.number().required(),
		rate: Joi.number().required(),
		img: Joi.string().required(),
		like: Joi.boolean().required(),
		editionNumber: Joi.string().required().min(0).max(20),
		curentlyReading: Joi.number().required(),
		haveRead: Joi.number().required(),
	})
	return bookSchema.validate(book)
}

module.exports = route

const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())

const home = require('./routes/home')
const books = require('./routes/books')

app.use('/', home)
app.use('/api/books', books)

const port = process.env.PORT || 3000

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})

require('dotenv').config()

const express = require('express')

const port = process.env.PORT

const apiRoute = require('./router/api/api.router')

const { dbConnection } = require('./config/db.config')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true } ))

dbConnection()

app.get('/', (req, res) => {
    res.send('Hello from expense tracker backend!')
})

app.use('/api', apiRoute)

app.listen(port, () => {
    console.log(`Server is running on 127.0.0.1:${port}`)
})

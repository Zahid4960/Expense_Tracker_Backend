require('dotenv').config()

const express = require('express')

const port = process.env.PORT

const apiRoute = require('./router/api/api.router')

const { dbConnection } = require('./config/db.config')
const { successResponse, errorResponse} = require('./helper/response.helper')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true } ))

dbConnection()

app.get('/', (req, res) => {
    return successResponse(res, 200, 'Hello from expense tracker', [])
})

app.use('/api', apiRoute)

app.all('*', (req, res, next ) => {
    return errorResponse(res, 404, 'Url not found!')
})

app.listen(port, () => {
    console.log(`Server is running on 127.0.0.1:${port}`)
})

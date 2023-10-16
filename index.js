require('dotenv').config()

const express = require('express')
const swaggerUi = require('swagger-ui-express')
const jsYaml = require('js-yaml')
const fs = require('fs')
const path = require('path')

const port = process.env.PORT

const apiRoute = require('./router/api/api.router')

const { dbConnection } = require('./config/db.config')
const { successResponse, errorResponse, exceptionResponse} = require('./helper/response.helper')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true } ))

dbConnection()

// Load YAML file
const swaggerDocument = jsYaml.load(fs.readFileSync(path.join(__dirname, './swagger/index.yaml'), 'utf8'))

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    successResponse(res, 200, 'Hello from expense tracker', [])
})

app.use('/api', apiRoute)

app.all('*', (req, res, next ) => {
    errorResponse(res, 404, 'Url not found!')
})

app.listen(port, () => {
    console.log(`Server is running on 127.0.0.1:${port}`)
})

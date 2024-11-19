require('dotenv').config()

// const apiRoute = require('./src/router/api/api.router')
const dbConfig = require('./src/config/dbConfig')
const express = require('express')
const fs = require('fs')
const jsYaml = require('js-yaml')
const path = require('path')
const port = process.env.PORT
const swaggerUi = require('swagger-ui-express')


const { SuccessResponse, ErrorResponse } = require('./src/utility/response')
const { responseFormatter } = require('./src/utility/response-formatter')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true } ))

dbConfig.dbConnection()

const swaggerDocument = jsYaml.load(fs.readFileSync(path.join(__dirname, '/src/swagger/index.yaml'), 'utf8'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/api', (req, res) => {
    responseFormatter(res, new SuccessResponse(200, 'Hello from expense tracker'))
})

// app.use('/api', apiRoute)

app.all('*', (req, res) => {
    responseFormatter(res, new ErrorResponse(404, 'Url not found!'))
})

app.listen(port, () => {
    console.log(`Server is running on 127.0.0.1:${port}`)
})

require('dotenv').config()

const express = require('express')
const swaggerUi = require('swagger-ui-express')
const jsYaml = require('js-yaml')
const fs = require('fs')
const path = require('path')

const port = process.env.PORT

const apiRoute = require('./router/api/api.router')

const { dbConnection } = require('./config/db.config')
const { SuccessResponse, ErrorResponse } = require('./utility/response')
const { responseFormatter } = require('./utility/response-formatter')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true } ))

dbConnection()

// Load YAML file
const swaggerDocument = jsYaml.load(fs.readFileSync(path.join(__dirname, './swagger/index.yaml'), 'utf8'))

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    responseFormatter(res, new SuccessResponse(200, 'Hello from expense tracker', []))
})

app.use('/api', apiRoute)

app.all('*', (req, res) => {
    responseFormatter(res, new ErrorResponse(404, 'Url not found!'))
})

app.listen(port, () => {
    console.log(`Server is running on 127.0.0.1:${port}`)
})

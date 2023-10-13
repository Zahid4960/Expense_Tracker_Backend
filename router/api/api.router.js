const express = require('express')
const router = express.Router()


const prefix = 'user'

router.get(`/${prefix}/login`, (req, res) => {
    res.status(200).json({ message: 'Hello from login page!' })
})

module.exports = router

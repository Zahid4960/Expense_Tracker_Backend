const express = require('express')
const router = express.Router()
const authController = require('../../controller/auth.controller')


const prefix = 'user'
router.post(`/${prefix}/registration`, authController.registration)
router.post(`/${prefix}/login`, authController.login)

module.exports = router

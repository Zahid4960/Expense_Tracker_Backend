const express = require('express')
const router = express.Router()
const { verifyToken } = require('../../middleware/auth.middleware')
const authController = require('../../controller/auth.controller')


const prefix = 'user'
router.post(`/${prefix}/registration`, authController.registration)
router.post(`/${prefix}/login`, authController.login)
router.post(`/${prefix}/verify-via-otp`, verifyToken, authController.verifyUserViaOtp)

module.exports = router

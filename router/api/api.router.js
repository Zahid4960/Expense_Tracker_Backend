const express = require('express')
const router = express.Router()
const { verifyToken } = require('../../middleware/auth.middleware')
const authController = require('../../controller/auth.controller')


const prefix = 'user'
router.post(`/${prefix}/registration`, authController.registrationPost)
router.post(`/${prefix}/login`, authController.loginPost)
router.post(`/${prefix}/verify-via-otp`, verifyToken, authController.verifyUserViaOtpPost)
router.post(`/${prefix}/forgot-password`, verifyToken, authController.forgotPasswordPost)

module.exports = router

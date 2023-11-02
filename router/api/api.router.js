const express = require('express')
const router = express.Router()
const { verifyToken, verifyUserAccount } = require('../../middleware/auth.middleware')
const authController = require('../../controller/auth.controller')
const addressController = require('../../controller/address.controller')
const expenseCategoryController = require('../../controller/expense-category.controller')


const prefix = 'user'
router.post(`/${prefix}/registration`, authController.registrationPost)
router.post(`/${prefix}/login`, authController.loginPost)
router.post(`/${prefix}/verify-via-otp`, verifyToken, authController.verifyUserViaOtpPost)
router.post(`/${prefix}/forgot-password`, verifyToken, verifyUserAccount, authController.forgotPasswordPost)
router.post(`/${prefix}/change-password`, verifyToken, verifyUserAccount, authController.changePasswordPost)
router.patch(`/${prefix}/update-profile/:userId`, verifyToken, verifyUserAccount, authController.userUpdateProfilePatch)
router.get(`/${prefix}/:userId`, verifyToken, verifyUserAccount, authController.userGet)
router.delete(`/${prefix}/:userId`, verifyToken, verifyUserAccount, authController.userDelete)

router.get(`/${prefix}/:userId/addresses`, verifyToken, verifyUserAccount, addressController.userAddressesGet)
router.post(`/${prefix}/:userId/addresses`, verifyToken, verifyUserAccount, addressController.userAddressesPost)
router.get(`/${prefix}/:userId/addresses/:addressId`, verifyToken, verifyUserAccount, addressController.addressByAddressIdGet)
router.patch(`/${prefix}/:userId/addresses/:addressId`, verifyToken, verifyUserAccount, addressController.updateAddressPatch)
router.delete(`/${prefix}/:userId/addresses/:addressId`, verifyToken, verifyUserAccount, addressController.addressDelete)

router.get(`/${prefix}/:userId/expense-categories`, verifyToken, verifyUserAccount, expenseCategoryController.expenseCategoriesGet)
router.post(`/${prefix}/:userId/expense-categories`, verifyToken, verifyUserAccount, expenseCategoryController.addExpenseCategoriesPost)
router.get(`/${prefix}/:userId/expense-categories/:expenseCategoryId`, verifyToken, verifyUserAccount, expenseCategoryController.expenseCategoryDetailsGet)

module.exports = router

const express = require('express')
const { authenticating, checkShopOwner } = require('../middleware/userAuthenticate')
const { userValidate, loginValidate } = require('../service/userService')
const { login, addUser } = require('../controller/userController')
const router = express.Router()

router.post('/login', loginValidate, login)
router.post('/users/create', authenticating, checkShopOwner, userValidate, addUser)
// router.put('/vendor/:id', updateVendor)
// router.delete('/vendor/:id', deleteVendor)
// router.get('/vendor', getAllVendor)
// router.get('/vendor/detail/:id', getByIdVendor)

module.exports = router

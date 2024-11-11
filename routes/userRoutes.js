const express = require('express')
const { authenticating, checkShopOwner } = require('../middleware/userAuthenticate')
const { userValidate, loginValidate } = require('../service/userService')
const {
  login,
  addUser,
  updateUser,
  deleteUser,
  getAllUser,
  getByIdUser
} = require('../controller/userController')
const router = express.Router()

router.post('/login', loginValidate, login)
router.post('/create', authenticating, userValidate, addUser)
router.put('/update/:id', authenticating, userValidate, updateUser)
router.delete('/delete/:id', authenticating, deleteUser)
router.get('/list', authenticating, getAllUser)
router.get('/detail/:id', authenticating, getByIdUser)

module.exports = router

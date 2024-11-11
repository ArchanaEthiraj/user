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
router.post('/users/create', authenticating, userValidate, addUser)
router.put('/users/update', authenticating, userValidate, updateUser)
router.delete('/users/delete', authenticating, deleteUser)
router.get('/users/list', authenticating, getAllUser)
router.get('/users/detail', authenticating, getByIdUser)

module.exports = router

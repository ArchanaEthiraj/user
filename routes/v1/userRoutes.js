const express = require('express')
const { authenticating, checkShopOwner } = require('../../middleware/userAuthenticate')
const { userValidate, loginValidate } = require('../../service/userService')
const {
  addUser,
  updateUser,
  deleteUser,
  getAllUser,
  getByIdUser
} = require('../../controller/userController');
const { login, getForgot, getReset, sendForgotOTP } = require('../../controller/loginController');
const router = express.Router();

// LOGIN ROUTES
router.post('/login', loginValidate, login);
router.post('/forgot-password/:userId', getForgot)
router.post('/reset-password/:userId', getReset)
router.post('/send-otp', sendForgotOTP)

// USER ROUTES
router.post('/create', authenticating, userValidate, addUser);
router.put('/update/:id', authenticating, userValidate, updateUser);
router.delete('/delete/:id', authenticating, deleteUser);
router.get('/list', authenticating, getAllUser);
router.get('/detail/:id', authenticating, getByIdUser);
router.get('/view/:id', getByIdUser);  //without authendicate 




module.exports = router;

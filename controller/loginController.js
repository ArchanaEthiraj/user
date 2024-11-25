const User = require('../model/userModel')
const jwt = require('jsonwebtoken')
const { sendEmail } = require('../utils/utils')

// LOGIN API
const login = async (req, res) => {
  try {
    const { email, password } = req.body
    console.log('login', email, password)

    let userRes = await User.findOne({ userEmail: email, isDeleted: false })
    console.log('userRes', userRes)

    if (!userRes) {
      return res.status(500).json({ message: 'User not Found' })
    }
    if (userRes.password === password) {
      let token = jwt.sign({ id: userRes.id, userType: userRes.role }, process.env.JWT_TOKEN, {
        expiresIn: '24hr'
      })
      console.log('userRes', userRes.id, userRes.role)
      console.log('token', token)
      return res.status(200).json({ message: 'Logged in Successfully!', token: token })
    } else {
      return res.status(500).json({ message: 'Password does not match' })
    }
  } catch (error) {
    console.log('error', error)
    return res.status(500).json({ message: 'Error Adding User', error: error })
  }
}

// SEND-OTP API 
const sendForgotOTP = async (req, res) => {
  try {
    const reqOtp = Math.floor(100000 + Math.random() * 900000)
    let email = req.body.userEmail
    let findEmail = await User.findOne({ userEmail: email, isDeleted: false })
    console.log(reqOtp, 'reqOtp')
    console.log('findEmail', findEmail)

    if (findEmail) {
    //   const resetToken = jwt.sign({ userId: findEmail._id }, process.env.JWT_TOKEN, {
    //     expiresIn: '5m'
    //   })

    //   const resetLink = `locahost:4000/api/v1/user/reset-password?token=${resetToken}`

      const mailOptions = {
        from: 'archana05.doodleblue@gmail.com',
        to: findEmail.userEmail,
        subject: 'Forgot OTP',
        htmlContent: `
        <p>Hello ${findEmail.userName},</p>
        <p>Your OTP to reset your password is: ${reqOtp}</p>
        <p>Please use this code within 5 minutes.</p>
        <p>Best regards, </p>
        `
      }
      await sendEmail(mailOptions)
      let updateOtp = { otp: reqOtp }
      let updateData = await User.findByIdAndUpdate({ _id: findEmail.id }, updateOtp)
      return res.status(200).json({ message: 'Mail send Successfully!', userDetail: findEmail})
    } else {
      return res.status(500).json({ message: 'User Not Found!'})
    }
  } catch (error) {
    console.log(error, 'error')
    return res.status(500).json({ message: 'Failed to send Mail', error: error })
  }
}

// VERFIY OTP API
const getForgot = async (req, res) => {
  try {
    let id = req.params.userId
    console.log('id', id)
    let dataOTP = req.body.otp
    console.log('dataOTP', dataOTP)
    let checkOTP = await User.findById(id)
    console.log('checkOTP', checkOTP)
    if (checkOTP) {
      if (parseInt(dataOTP) === parseInt(checkOTP.otp)) {
        return res.status(200).json({ message: 'Successfully Verified' })
      } else {
        return res.status(500).json({ message: 'Invalid OTP' })
      }
    } else {
      return res.status(500).json({ message: 'Invalid User' })
    }
  } catch (error) {
    console.log(error, 'error')
    return res.status(500).json({ message: 'OTP Failed', error: error })
  }
}

// RESET API
const getReset = async (req, res) => {
  try {
    if (!req.body.password) {
      return res.status(403).json({ message: 'Password Required' })
    }
    let id = req.params.userId
    let updatePassword = req.body.password

    let updatedPass = { password: updatePassword }
    if (id) {
      let password = await User.findByIdAndUpdate({ _id: id }, updatedPass)
      return res.status(200).json({ message: 'Updated Password Successfully!' })
    } else {
      return res.status(500).json({ message: 'Unable to Update Password' })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Unable to Update Password', error: error })
  }
}

module.exports = { login, getForgot, getReset, sendForgotOTP }

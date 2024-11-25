const User = require('../model/userModel')
const moment = require('moment')
const jwt = require('jsonwebtoken')

// USER CREATE API
const addUser = async (req, res) => {
  try {
    const { userName, userPhone, userEmail, password, userDOB, role } = req.body

    const passDOB = moment(userDOB, 'YYYY-MM-DD', true)

    if (!passDOB) {
      return res.status(400).json({ message: 'Invalid Date Format, Please use YYYY-MM-DD' })
    }

    let userRes = await User.findOne({ userEmail: userEmail, isDeleted: false })
    console.log('userRes', userRes)

    if (userRes) {
      return res.status(500).json({ message: 'Email Already Exists' })
    }

    const userProfilePic = req.file ? `/uploads/${req.file.filename}` : null

    // password should be encryption and decryption need to study ---> package bcrypt or bcryptjs
    const newUser = new User({
      userName,
      userPhone,
      userEmail,
      password,
      userDOB: passDOB.date(),
      role,
      userProfilePic
    })
    await newUser.save()
    res.status(200).json({ message: 'User Added Successfully!' })
  } catch (error) {
    res.status(500).json({ message: 'Error Adding User', error: error })
  }
}

// UPDATE USER API
const updateUser = async (req, res) => {
  try {
    let id = req.params.id

    if(!id){
      return res.status(400).json({ message: 'Id Required' })
    }
    let updateUser = req.body
    await User.findByIdAndUpdate({ _id: id }, updateUser)
    return res.status(200).json({ message: 'Updated Successfully!' })
  } catch (error) {
    console.log('error', error)
    return res.status(500).json({ message: 'Error while Updating', error: error })
  }
}

// GET BY ID USER API
const getByIdUser = async (req, res) => {
  try {
    let id = req.params.id
    if(!id){
      return res.status(400).json({ message: 'Id Required' })
    }
    let data = await User.findOne({ _id: id, isDeleted: false })
    if(!data){
      return res.status(200).json({ message: 'No Data Found' })
    }
    return res.status(200).json({ message: 'User Data', data: data })
  } catch (error) {
    console.log('error', error)
    return res.status(500).json({ message: 'Error', error: error })
  }
}

// DELETE USER API
const deleteUser = async (req, res) => {
  try {
    let id = req.params.id
    if(!id){
      return res.status(400).json({ message: 'Id Required' })
    }
    let updateUser = { isDeleted: true }
    await User.findByIdAndUpdate({ _id: id }, updateUser)
    return res.status(200).json({ message: 'Deleted Successfully!' })
  } catch (error) {
    console.log('error', error)
    return res.status(500).json({ message: 'Error', error: error })
  }
}

// USER LIST API
const getAllUser = async (req, res) => {
  try {
    let data = await User.find({ isDeleted: false })
    return res.status(200).json({ message: 'Listed Successfully!', data: data })
  } catch (error) {
    return res.status(500).json({ message: 'Error', error: error })
  }
}

module.exports = { addUser, updateUser, getByIdUser, deleteUser, getAllUser }

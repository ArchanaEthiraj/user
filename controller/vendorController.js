const Vendor = require('../model/vendorModel')
const moment = require('moment')

const addVendor = async (req, res) => {
  try {
    const {
      vendorName,
      vendorPhone,
      vendorEmail,
      // vendorProfilePic,
      // aadharCard,
      // panCard,
      password,
      vendorDOB,
      role,
      amountQuoted,
      shopId,
      isActive,
      isDeleted
    } = req.body

    const passDOB = moment(vendorDOB, 'YYYY-MM-DD', true)

    if (!passDOB) {
      return res.status(400).json({ message: 'Invalid Date Format, Please use MM-DD-YYYY' })
    }

    const vendorProfilePic = req.file ? `/uploads/${req.file.filename}` : null;
    const aadharCard = req.file ? `/uploads/${req.file.filename}` : null;
    const panCard = req.file ? `/uploads/${req.file.filename}` : null;

    const newVendor = new Vendor({
      vendorName,
      vendorPhone,
      vendorEmail,
      vendorProfilePic,
      aadharCard,
      panCard,
      password,
      vendorDOB: passDOB.toDate(),
      role,
      amountQuoted,
      shopId,
      isActive,
      isDeleted
    })
    await newVendor.save()
    res.status(200).json({ message: 'Vendor Added Successfully!' })
  } catch (error) {
    res.status(500).json({ message: 'Error Adding Vendor', error: error })
  }
}

const updateVendor = async (req, res) => {
  try {
    let id = req.params.id
    let updateVendor = req.body
    await Vendor.findByIdAndUpdate({ _id: id }, updateVendor)
    res.status(200).json({ message: 'Updated Successfully!' })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ message: 'Error while Updating', error: error })
  }
}

const getByIdVendor = async (req, res) => {
  try {
    let id = req.params.id
    let data = await Vendor.findById({ _id: id })
    res.status(200).json({ message: 'Vendor Data', data: data })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ message: 'Error', error: error })
  }
}

const deleteVendor = async (req, res) => {
  try {
    let id = req.params.id
    await Vendor.findByIdAndDelete({ _id: id })
    res.status(200).json({ message: 'Deleted Successfully!' })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ message: 'Error', error: error })
  }
}

const getAllVendor = async (req, res) => {
  try {
    let data = await Vendor.find()
    res.status(200).json({ message: 'Listed Successfully!', data: data })
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error })
  }
}

module.exports = { addVendor, updateVendor, getByIdVendor, deleteVendor, getAllVendor }

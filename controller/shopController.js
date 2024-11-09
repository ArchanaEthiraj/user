const Shop = require('../model/shopModel')

const addShop = async (req, res) => {
  try {
    const {
      shopName,
      shopId,
      ownerName,
      ownerPhone,
      ownerEmail,
      BookingStatus,
      password,
      role,
      isActive,
      isDeleted
    } = req.body

    const ownerProfilePic = req.file ? `/uploads/${req.file.filename}` : null;

    const newShop = new Shop({
      shopName,
      shopId,
      ownerName,
      ownerPhone,
      ownerEmail,
      BookingStatus,
      ownerProfilePic,
      password,
      role,
      isActive,
      isDeleted
    })
    await newShop.save()
    res.status(200).json({ message: 'Shop Added Successfully!' })
  } catch (error) {
    res.status(500).json({ message: 'Error Adding Shop', error: error })
  }
}

const updateShop = async (req, res) => {
  try {
    let id = req.params.id
    let updateShop = req.body
    await Shop.findByIdAndUpdate({ _id: id }, updateShop)
    res.status(200).json({ message: 'Updated Successfully!' })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ message: 'Error while Updating', error: error })
  }
}

const getByIdShop = async (req, res) => {
  try {
    let id = req.params.id
    let data = await Shop.findById({ _id: id })
    res.status(200).json({ message: 'Shop Data', data: data })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ message: 'Error', error: error })
  }
}

const deleteShop = async (req, res) => {
  try {
    let id = req.params.id
    await Shop.findByIdAndDelete({ _id: id })
    res.status(200).json({ message: 'Deleted Successfully!' })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ message: 'Error', error: error })
  }
}

const getAllShop = async (req, res) => {
  try {
    let data = await Shop.find()
    res.status(200).json({ message: 'Listed Successfully!', data: data })
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error })
  }
}

module.exports = { addShop, updateShop, getByIdShop, deleteShop, getAllShop }

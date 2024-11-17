const Shop = require('../model/shopModel')

const createShop = async (req, res, next) => {
  try {
    const { shopName, userId, price ,isActive } = req.body

    let shopRes = await Shop.findOne({ shopName: shopName, isDeleted: false })
    console.log('shopRes', shopRes)

    if (shopRes) {
      return res.status(500).json({ message: 'Shop Already Exists' })
    }

    const shopCreate = new Shop({
      shopName,
      userId,
      isActive,
      price
    })

    await shopCreate.save()
    return res.status(200).json({ message: 'Shop Added Successfully!' })
  } catch (error) {
    console.log('error', error)
    return res.status(500).json({ message: 'Unable to add Shop', error: error })
  }
}

const updateShop = async (req, res) => {
  try {
    let id = req.params.id
    if(!id){
      return res.status(400).json({ message: 'Id Required' })
    }
    let updateShop = req.body
    await Shop.findByIdAndUpdate({ _id: id }, updateShop)
    return res.status(200).json({ message: 'Updated Successfully!' })
  } catch (error) {
    console.log('error', error)
    return res.status(500).json({ message: 'Error while Updating', error: error })
  }
}

const getByIdShop = async (req, res) => {
  try {
    let id = req.params.id
    if(!id){
      return res.status(400).json({ message: 'Id Required' })
    }
    let data = await Shop.findById({ _id: id })
    return res.status(200).json({ message: 'Shop Data', data: data })
  } catch (error) {
    console.log('error', error)
    return res.status(500).json({ message: 'Error', error: error })
  }
}

const deleteShop = async (req, res) => {
  try {
    let id = req.params.id
    if(!id){
      return res.status(400).json({ message: 'Id Required' })
    }
    let updateShop = { isDeleted: true }
    await Shop.findByIdAndUpdate({ _id: id }, updateShop)
    res.status(200).json({ message: 'Deleted Successfully!' })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ message: 'Error', error: error })
  }
}

const getAllShop = async (req, res) => {
  try {
    let data = await Shop.find({ isDeleted: false })
    return res.status(200).json({ message: 'Listed Successfully!', data: data })
  } catch (error) {
    return res.status(500).json({ message: 'Error', error: error })
  }
}

module.exports = { createShop, updateShop, getByIdShop, deleteShop, getAllShop }

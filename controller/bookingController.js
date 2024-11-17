const Booking = require('../model/bookingModel')
const Shop = require('../model/shopModel')

const createBooking = async (req, res, next) => {
  try {
    const { shopId, userId, shopOwnerId } = req.body
    let bookingDate = new Date()
    let bookingRes = await Booking.findOne({
      shopId,
      userId,
      shopOwnerId,
      bookingStatus: 'pending',
      isDeleted: false
    })
    console.log('bookingStatus', bookingStatus)

    if (bookingRes) {
      return res.status(500).json({ message: 'Shop Already Booked' })
    }

    const bookingCreate = new Booking({
      shopId,
      userId,
      shopOwnerId,
      bookingDate: bookingDate,
      bookingStatus: 'pending'
    })

    let values = await bookingCreate.save()
    if (values) {
      // vendar and shop onwer mail functions

      let confirm_link = ` v1/update?confirm=1&shopId=${shopId}&userId=${userId}&shopOnwerId=${shopOwnerId}`
      let rejected_link = `v1/update?confirm=0&shopId=${shopId}&userId=${userId}&shopOnwerId=${shopOwnerId}`

      // in html button link want above there

      return res.status(200).json({ message: 'Booking Create Successfully!' })
    } else {
      return res.status(500).json({ message: 'Unable to Create Booking' })
    }
  } catch (error) {
    console.log('error', error)
    return res.status(500).json({ message: 'Unable to Create Booking', error: error })
  }
}

const updateBooking = async (req, res) => {
  try {
    let id = req.params.id
    if (!id) {
      return res.status(400).json({ message: 'Id Required' })
    }
    let updateBooking = req.body
    await Booking.findByIdAndUpdate({ _id: id }, updateBooking)
    return res.status(200).json({ message: 'Updated Successfully!' })
  } catch (error) {
    console.log('error', error)
    return res.status(500).json({ message: 'Error while Updating', error: error })
  }
}

const getByIdBooking = async (req, res) => {
  try {
    let id = req.params.id
    if (!id) {
      return res.status(400).json({ message: 'Id Required' })
    }
    let data = await Booking.findById({ _id: id })
    return res.status(200).json({ message: 'Booking Data', data: data })
  } catch (error) {
    console.log('error', error)
    return res.status(500).json({ message: 'Error', error: error })
  }
}

const deleteBooking = async (req, res) => {
  try {
    let id = req.params.id
    if (!id) {
      return res.status(400).json({ message: 'Id Required' })
    }
    let updateShop = { isDeleted: true }
    await Booking.findByIdAndUpdate({ _id: id }, updateShop)
    res.status(200).json({ message: 'Deleted Successfully!' })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ message: 'Error', error: error })
  }
}

const getAllBooking = async (req, res) => {
  try {
    let data = await Booking.find({ isDeleted: false })
    return res.status(200).json({ message: 'Listed Successfully!', data: data })
  } catch (error) {
    return res.status(500).json({ message: 'Error', error: error })
  }
}

const updateShopStatusAndBookingStatus = async (res, req, next) => {
  try {
    // default set the bookingstatus pendingByowner

    let confirmStatus = req.query.confirm
    if (confirmStatus == 1) {
      await Shop.findByIdAndUpdate({ id: id, isActive: false })
      await Booking.findByIdAndUpdate({
        userId: req.query.userId,
        bookingstatus: 'approved and paymentpending'
      })
      return res.status(200).json({ message: 'Approved Successfully!' })
    } else if (confirmStatus == 0) {
      await Shop.findByIdAndUpdate({ id: id, isActive: true })
      await Booking.findByIdAndUpdate({
        userId: req.query.userId,
        bookingstatus: 'bookingRejected'
      })
      return res.status(200).json({ message: 'Rejected Successfully!' })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error', error: error })
  }
}

module.exports = {
  createBooking,
  updateBooking,
  getByIdBooking,
  deleteBooking,
  getAllBooking,
  updateShopStatusAndBookingStatus
}

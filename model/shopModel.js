const mongoose = require('mongoose')

const shop = new mongoose.Schema(
  {
    shopName: {
      type: String,
      require: true
    },
    shopId: {
      type: String,
      require: true
    },
    ownerName: {
      type: String,
      require: true
    },
    ownerPhone: {
      type: String,
      require: true
    },
    ownerEmail: {
      type: String,
      require: true
    },
    BookingStatus: {
      type: String,
      require: true
    },
    ownerProfilePic: {
      type: String
    },
    password: {
      type: String,
      require: true
    },
    role: {
      type: String,
      require: true
    },
    isActive: {
      type: Boolean,
      default: false
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

const Shop = mongoose.model('Shop', shop)

module.exports = Shop

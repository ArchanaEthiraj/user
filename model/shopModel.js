const mongoose = require('mongoose')

// SHOP SCHEMA
const shop = new mongoose.Schema(
  {
    shopName: {
      type: String,
      require: true
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      require: true
    },
    price: {
      type: String,
      default: true
    },
    isActive: {
      type: Boolean,
      default: true
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

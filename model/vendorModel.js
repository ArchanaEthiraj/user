const mongoose = require('mongoose')

const vendor = new mongoose.Schema(
  {
    vendorName: {
      type: String,
      require: true
    },
    vendorPhone: {
      type: String,
      require: true
    },
    vendorEmail: {
      type: String,
      require: true
    },
    vendorProfilePic: {
      type: String
    },
    aadharCard: {
      type: String
    },
    panCard: {
      type: String
    },
    password: {
      type: String,
      require: true
    },
    vendorDOB: {
      type: String,
      require: true
    },
    role: {
      type: String,
      require: true
    },
    amountQuoted: {
      type: String,
      require: true
    },
    shopId: {
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

const Vendor = mongoose.model('Vendor', vendor)

module.exports = Vendor

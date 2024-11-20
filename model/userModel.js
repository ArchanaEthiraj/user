const mongoose = require('mongoose')

const user = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: true
    },
    userPhone: {
      type: String,
      require: true
    },
    userEmail: {
      type: String,
      require: true
    },
    userProfilePic: {
      type: String
    },
    password: {
      type: String,
      require: true
    },
    userDOB: {
      type: String,
      require: true
    },
    role: {
      type: String,
      require: true,
      enum: ['Vendor', 'Shop Owner']
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

const User = mongoose.model('User', user)

module.exports = User

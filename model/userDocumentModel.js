const mongoose = require('mongoose')

const userDocument = new mongoose.Schema(
  {
    docName: {
      type: String,
      require: true
    },
    docType: {
      type: String,
      require: true
    },
    status: {
      type: String,
      require: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
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

const UserDocument = mongoose.model('UserDocument', userDocument)

module.exports = UserDocument

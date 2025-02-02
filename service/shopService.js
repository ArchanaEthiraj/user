const joi = require('joi')

// SHOP VALIDATE FUNCTION
const shopValidate = async (req, res, next) => {
  try {
    const shopSchema = joi.object({
      shopName: joi.string().max(100).required(),
      price: joi.string().required(),
    })
    let { error, value } = await shopSchema.validateAsync(req.body)
    if (error) {
      throw error
    } else {
      next()
    }
  } catch (error) {
    return res.status(400).json({ message: error })
  }
}

module.exports = { shopValidate }

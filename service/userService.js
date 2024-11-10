const joi = require('joi')

const loginValidate = async (req, res, next) => {
  try {
    const loginSchema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().required()
    })
    let { error, value } = await loginSchema.validateAsync(req.body)
    console.log('value', value)
    if (error) {
      throw error.details[0].message || error.message
    } else {
      next()
    }
  } catch (error) {
    console.log('error---->', error)
    return res.status(400).json({ message: error.details[0].message || error})
  }
}

const userValidate = async (req, res, next) => {
  try {
    const userSchema = joi.object({
      userName: joi.string().max(100).required(),
      userPhone: joi.string().required(),
      userDOB: joi.date().required(),
      userEmail: joi.string().email().required(),
      password: joi.string().required(),
      role: joi.string().required(),
    })
    let { error, value } = await userSchema.validateAsync(req.body)
    if (error) {
      throw error
    } else {
      next()
    }
  } catch (error) {
    return res.status(400).json({ message: error })
  }
}

module.exports = { userValidate, loginValidate }

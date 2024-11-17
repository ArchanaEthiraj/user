const bookingValidate = async (req, res, next) => {
    try {
      const bookingSchema = joi.object({
        shopId: joi.string().required(),
        userId: joi.string().required(),
        shopOwnerId: joi.string().required(),
      })
      let { error, value } = await bookingSchema.validateAsync(req.body)
      if (error) {
        throw error
      } else {
        next()
      }
    } catch (error) {
      return res.status(400).json({ message: error })
    }
  }

  

module.exports = { bookingValidate }

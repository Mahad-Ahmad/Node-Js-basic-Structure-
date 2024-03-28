const { body, validationResult } = require('express-validator')
const APIError = require('../utils/APIError')
const userValidationRules = () => {
  return [
    // username must be an email
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 }),
    //first_name is required
    body('firstname').not().isEmpty(),
    //last_name is required
    body('lastname').not().isEmpty(),

  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  throw new APIError({errors:extractedErrors,message:'validation Error',status:422})
}

module.exports = {
  userValidationRules,
  validate,
}
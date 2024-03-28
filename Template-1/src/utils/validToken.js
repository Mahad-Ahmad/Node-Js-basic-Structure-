const userModel = require('../models/user.model')


const validToken= async () => {
    const user = await userModel.findOne({})
    return user.system_user_access_token.trim()
}

module.exports = validToken
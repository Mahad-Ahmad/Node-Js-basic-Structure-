const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
var UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  facebook_id: { type: String },
  lastname: { type: String, required: true },
  profileImage: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  app_token: { type: String },
  system_user_access_token: { type: String }
}, { timestamps: true })

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
}

UserSchema.pre("save", async function save(next) {
  try {
    if (!this.isModified("password")) return next();
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    return next();
  } catch (error) {
    return next(error);
  }
});
module.exports = mongoose.model('user', UserSchema)
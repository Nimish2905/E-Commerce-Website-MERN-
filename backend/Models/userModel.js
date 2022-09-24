//User Name
//User Email
//User Password
//User Phone
//User DateOfRegister

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true, unique: true },
  userDateOfRegister: { type: Date },
  userPassword: { type: String },
  isAdmin: { type: Boolean, default: false },
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.userPassword);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.userPassword = await bcrypt.hash(this.userPassword, salt);
});
const user = mongoose.model("user", userSchema);
module.exports = user;

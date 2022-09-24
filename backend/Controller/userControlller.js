const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const user = require("../Models/userModel");

const registerUser = expressAsyncHandler(async (req, res) => {
  const { userName, userEmail, userPassword, userDateOfRegister } = req.body;

  if (!userName || !userEmail || !userPassword) {
    res.status(400);
    throw new Error("Please Enter all fields");
  }

  const userExists = await user.findOne({ userEmail });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists with this email Id");
  }
  const User = await user.create({
    userName,
    userEmail,
    userPassword,
    userDateOfRegister,
  });

  if (User) {
    res.status(201).json({
      _id: User.id,
      name: User.userName,
      email: User.userEmail,
      dateOfRegister: User.userDateOfRegister,
      token: generateToken(User._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const authUser = expressAsyncHandler(async (req, res) => {
  const { userEmail, userPassword } = req.body;

  const User = await user.findOne({ userEmail });

  if (User && (await User.matchPassword(userPassword))) {
    res.json({
      _id: User._id,
      name: User.userName,
      email: User.userEmail,
      token: generateToken(User._id),
      isAdmin: User.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { registerUser, authUser };

const express = require("express");
const { UserModel } = require('../Models/user.model');
const UserRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
UserRouter.get('/', (req, res) => {
  res.send("Hi, this is on")
})

UserRouter.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;
  try {
    const verify = await UserModel.findOne({ email });
    if (verify) {
      res.status(400).json({ message: "User already exists" });
    } else {
      const newUser = new UserModel({name,email,pass,cart:[{}],order:[{}]});
      await newUser.save()
      res.status(200).send({ message: "User registered" })
    }
  }
  catch (error) {
    res.status(400).send(error)
  }
});

UserRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  const user = await UserModel.findOne({ email: email });
  try {
    const result = pass == user.pass;
    if (result) {
      const token = jwt.sign({ userId: user._id }, "contribute");
      res.status(200).json({ msg: "User logged in successfull", token, name:user.name });
    } else {
      res.status(200).json({ msg: "Wrong credentials" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
})
module.exports = { UserRouter }

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "firstName is required!"],
  },
  lastName: {
    type: String,
    required: [true, "lastName is required!"],
  },
  username: {
    type: String,
    required: [true, "username is required!"],
  },
  gender: {
    type: String,
    required: [true, "gender is required!"],
  },
  city: {
    type: String,
    required: [true, "city is required!"],
  },
  number: {
    type: Number,
    required: [true, "number is required!"],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "email is required!"],
  },
  password: {
    type: String,
    required: [true, "password is required!"],
    minlength: [8, "password must be min 8 characters long!"],
    trim: true,
    select: false,
  },
});

//Password hashing
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Unhashing password
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//Generating JWT Token
UserSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User = model("user", UserSchema);

export default User;

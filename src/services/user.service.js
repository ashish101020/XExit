const { User } = require("../models/user.model");
const status = require("http-status");
const jwt = require("jsonwebtoken");

const getUserByUsername = async (username) => {
  try {
    const user = await User.findOne({ username });
    console.log("getUserByUsername:", user);
    return user;
  } catch (error) {
    console.error("Error in getUserByUsername:", error);
    throw error;
  }
};

const createUser = async (data) => {
  try {
    console.log("In create user");

    const { role } = data;

    if (role === "HR") {
      const existingHr = await User.findOne({ role: "HR" });
      if (existingHr) {
        throw new Error("HR account already exists");
      }
    }
    console.log(data.username);
    let userExists = await User.findOne({ username: data.username });
    if (userExists) {
      throw new Error("Username already taken");
    }

    const user = new User({ ...data });

    await user.save();
    return user;
  } catch (error) {
    console.error("Error in createUser:", error);
    throw error;
  }
};

module.exports = { createUser, getUserByUsername };

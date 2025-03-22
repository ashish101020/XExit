const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      // validate(value) {
      //   if (!value.match(/\d/) || !value.match(/[a-z]/) || !value.match(/[A-Z]/)) {
      //     throw new Error("Password must contain at least one uppercase letter, one lowercase letter, and one number");
      //   }
      // },
    },
    role: {
      type: String,
      enum: ["HR", "Employee"],
      // required: true,
      default: "Employee",
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving the user
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare passwords
userSchema.methods.isPasswordMatch = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Joi validation for user registration
const validateUser = (user) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("HR", "Employee").required(),
  });

  return schema.validate(user);
};

const User = mongoose.model("User", userSchema);
module.exports = { User, validateUser };

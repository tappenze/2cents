/**
 * @fileoverview This file holds the schema for Users
 * @author Chris Koehne <cdkoehne@gmail.com>
 */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      validate: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    },
    password: { type: String, required: true },
    charity: { type: String, required: true, default: "none" },
    active: { type: Boolean, required: true, default: false },
    accessToken: { type: String, required: false },
    itemId: { type: String, required: false },
  },
  { timestamps: true }
);

const usersDB = mongoose.connection.useDb("Users");
const User = usersDB.model("User", userSchema);

module.exports = User;

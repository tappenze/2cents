/**
 * @fileoverview This file holds all functions to handle creation and modification of users
 * @author Chris Koehne <cdkoehne@gmail.com>
 */

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const User = require('../Models/User');
const constants = require('../constants');

/**
 * require bcrypt for hashing
 */
const bcrypt = require('bcrypt');

/**
 * require jsonwebtoken for authentication
 */
const jwt = require('jsonwebtoken');

/**
 * This function takes in an email and password and attempts to create a user
 * in the database.
 *
 * @param {String} addMe.email the email of the user to be created
 * @param {String} addMe.password the password of the user to be created
 * @returns {String} the string response (Success or Failure)
 */
exports.addUser = async function (addMe) {
  try {
    addMe.email = addMe.email.toLowerCase();
    let exists = await User.find({ email: addMe.email });
    if (exists.length > 0) {
      return constants.U_EMAIL_TAKEN;
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(addMe.password, salt);
    addMe.password = hashedPassword;
    let result = await User.create(addMe);

    if (result instanceof User) {
      console.log('User Created!');
      const token = jwt.sign({ id: result._id }, process.env.JWT_SECRET, {
        expiresIn: '6h',
      });
      return token;
    }
    return constants.U_CREATION_FAILURE;
  } catch (err) {
    return err;
  }
};

/**
 * This function takes in an email and attempts to search the database for the user with that email
 *
 * @param {String} email the email of the user to be searched for
 * @returns {JSON} the JSON object of the user
 */
exports.getUserByEmail = async function (email) {
  result = await User.find({ email: email });

  return result;
};

/**
 * This function takes in an email and attempts to search the database for the user with that email
 *
 * @param {String} email the email of the user to be searched for
 * @returns {JSON} the JSON object of the user
 */
exports.getUserById = async function (id) {
  try {
    result = await User.findOne({ _id: id });
    return result;
  } catch (err) {
    return err;
  }
};

/**
 * This function takes in an email and a password and attempts to log in the user
 * corresponding to them.
 *
 * @param {String} user.email the email of the user to be logged in
 * @param {String} user.password the hashed password of the user
 * @returns {String} the string response
 */
exports.login = async function (user) {
  try {
    let match = await User.findOne({ email: user.email });
    if (match === null) {
      return constants.U_INVALID_CREDENTIALS;
    }
    if (await bcrypt.compare(user.password, match.password)) {
      const token = jwt.sign({ id: match._id }, process.env.JWT_SECRET, {
        expiresIn: '6h',
      });
      return token;
    } else {
      return constants.U_INVALID_CREDENTIALS;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

/**
 * This function takes in a user's id and charity and updates their current charity
 *
 * @param {String} user.id the id of the user to access
 * @param {String} user.charity the charity to select
 * @returns {String} the string response
 */
exports.charitySelect = async function (user) {
  try {
    let filter = { _id: user.id };
    let update = { charity: user.charity, active: true };
    const opts = { runValidators: true };
    let match = await User.findOne(filter).select('-_password');
    if (match === null) {
      return constants.U_DOES_NOT_EXIST;
    }
    let result = await User.findOneAndUpdate(filter, update, opts).select('-_password');
    if (result instanceof User) {
      return "Charity switched to " + user.charity;
    }
    return "Could not update charity to " + user.active;
    
  } catch (err) {
    console.log(err);
    return err;
  }
};

/**
 * This function takes in a user's id and gets the status of their current charity
 *
 * @param {String} id the id of the user to access
 * @returns {String} the string response
 */
exports.charityStatus = async function (id) {
  try {
    let match = await User.findOne({ _id: id }).select('charity active -_id');
    if (match === null) {
      return constants.U_DOES_NOT_EXIST;
    }
    return match;
  } catch (err) {
    console.log(err);
    return err;
  }
};

/**
 * This function takes in a user's id and sets their charity's active status to specified value
 *
 * @param {String} user.id the id of the user to access
 * @param {String} user.active the new active status
 * @returns {String} the string response
 */
exports.updateActivity = async function (user) {
  try {
    let match = await User.findOne({ _id: user.id }).select('charity active -_id');
    if (match === null) {
      return constants.U_DOES_NOT_EXIST;
    }
    let result = await User.findOneAndUpdate({ _id: user.id }, {active: user.active});
    if (result instanceof User) {
      return "Updated to " + user.active;
    }
    return "Could not update to " + user.active;
  } catch (err) {
    console.log(err);
    return err;
  }
};

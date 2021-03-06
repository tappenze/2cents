/**
 * @fileoverview This file routes all requests to a specific function
 * @author Chris Koehne <cdkoehne@gmail.com>
 */

/**
 * import all libraries we need for this file
 */
var express = require('express');
var userRouter = express.Router();
const path = require('path');

const constants = require('../constants');

const auth = require('../auth/auth.js');

/**
 * import the userService file and all functions included inside of it
 */

const userService = require(path.resolve(
  __dirname,
  '../Services/userService.js'
));


/**
 * allow post to access json
 */
userRouter.use(express.json());


/**
 * endpoint for getting json of all users from database
 */
userRouter.get('/users', auth.authenticateJWT, async function (req, res) {
  const users = await User.find({});
  res.json(users);
});

/**
 * endpoint for getting a user by their id
 */
userRouter.get('/users/id/:id', auth.authenticateJWT, async function (req, res) {
  let id = req.params.id;
  let result = await userService.getUserById(id);
  if (result instanceof Error) {
    res.status(400).send(result.message);
  } else {
    res.status(200).send(result);
  }
});

/**
 * endpoint for updating database of users
 */

/**
 * Endpoint to create an order
 */
userRouter.post('/users/signup', async function (req, res) {
  let result = await userService.addUser(req.body);
  if (result === constants.U_CREATION_FAILURE) {
    res.status(500).send(result);
  } else if (result === constants.U_EMAIL_TAKEN) {
    res.status(409).send(result);
  } else if (result instanceof Error) {
    res.status(400).send(result.message);
  } else {
    res.status(200).send(result);
  }
});

/**
 * endpoint for logging in / comparing user credentials
 */
userRouter.post('/users/login', async function (req, res) {
  let result = await userService.login(req.body);
  if (result === constants.U_INVALID_CREDENTIALS) {
    res.status(401).send(result);
  } else if (result instanceof Error) {
    console.log(result);
    res.status(400).send(result.message);
  } else {
    res.status(200).send(result);
  }
});

userRouter.put('/users/charity-select', auth.authenticateJWT, async function (req, res) {
  let result = await userService.charitySelect(req.body);
  if (result === constants.U_DOES_NOT_EXIST) {
    res.status(404).send(result);
  } else if (result instanceof Error) {
    console.log(result);
    res.status(400).send(result.message);
  } else {
    res.status(200).send(result);
  }
});

userRouter.get('/users/:id/charity-status', auth.authenticateJWT, async function (req, res) {
  let result = await userService.charityStatus(req.params.id);
  if (result === constants.U_DOES_NOT_EXIST) {
    res.status(404).send(result);
  } else if (result instanceof Error) {
    console.log(result);
    res.status(400).send(result.message);
  } else {
    res.status(200).send(result);
  }
});

userRouter.put('/users/update-activity', auth.authenticateJWT, async function (req, res) {
  let result = await userService.updateActivity(req.body);
  if (result === constants.U_DOES_NOT_EXIST) {
    res.status(404).send(result);
  } else if (result instanceof Error) {
    console.log(result);
    res.status(400).send(result.message);
  } else {
    res.status(200).send(result);
  }
});


/**
 * allows index.js to access this file
 */
module.exports = userRouter;

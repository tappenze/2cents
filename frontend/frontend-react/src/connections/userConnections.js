/**
 * @fileoverview This file should handle all user connnections from the frontend to the backend
 * @author Chris Koehne <cdkoehne@gmail.com>
 *
 */

import jwt_decode from 'jwt-decode';

let BASE = 'http://localhost:5000';

/**
 * This function connects to the backend to signup a user
 * @param {String} email the email to signup with
 * @param {String} password the new user's password
 * @return {String} a jwt or error message
 */
export const signup = async (email, password) => {
  let data = {
    email: email,
    password: password,
    charity: 'none',
    active: true,
  };

  let res = await fetch(BASE + '/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return { status: res.status, message: await res.text() };
};

/**
 * This function connects to the backend to signup a user
 * @param {String} email the email to signup with
 * @param {String} password the new user's password
 * @return {String} a jwt or error message
 */
export const login = async (email, password) => {
  let data = {
    email: email,
    password: password,
  };

  let res = await fetch(BASE + '/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return { status: res.status, message: await res.text() };
};

/**
 * This function changes a user's charity
 * @param {String} jwt the jwt
 * @param {String} charity the charity to select
 * @return {JSON || String} either the order that was updated or an error message
 */
export const charitySelect = async (jwt, charity) => {
  let id = jwt_decode(jwt).id;
  let data = {
    id: id,
    charity: charity,
  };

  let res = await fetch(BASE + '/users/charity-select', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwt,
    },
    body: JSON.stringify(data),
  });

  return { status: res.status, message: await parseBody(res) };
};



/**
 * This function gets a user's charity status
 * @param {String} jwt the jwt
 * @return {JSON || String} either the order that was updated or an error message
 */
export const charityStatus = async (jwt) => {
  let id = jwt_decode(jwt).id;

  let res = await fetch(BASE + '/users/' + id + '/charity-status', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwt,
    },
  });
  console.log("finished res")
  return { status: res.status, message: await parseBody(res) };
};


/**
 * This function updates the user's charity activity
 * @param {String} jwt the jwt
 * @param {String} active the new active status
 * @return {String} a jwt or error message
 */
export const updateActivity = async (jwt, active) => {
  let id = jwt_decode(jwt).id;
  let data = {
    id: id,
    active: active,
  };

  let res = await fetch(BASE + '/users/update-activity', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwt,
    },
    body: JSON.stringify(data),
  });

  return { status: res.status, message: await parseBody(res) };
};


/**
 * This function parses the response since it could either be of type text or json
 * @param {Object} res the response from the backend
 * @returns {JSON || String} either the order(s) or the error message
 */
const parseBody = async (res) => {
  let text = await res.text();
  try {
    let json = JSON.parse(text);
    return json;
  } catch {
    return text;
  }
};

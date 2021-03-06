
/**
 * @fileoverview This file should handle all user connnections from the frontend to the backend
 * @author Chris Koehne <cdkoehne@gmail.com>
 *
 */


let BASE = "http://localhost:5000";

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
    charity: "none",
    active: true
  };
  
  let res = await fetch(BASE + "/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
    charity: "none",
    active: true
  };
  
  let res = await fetch(BASE + "/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return { status: res.status, message: await res.text() };
};


/**
 * This function parses the response since it could either be of type text or json
 * @param {Object} res the response from the backend
 * @returns {JSON || String} either the order(s) or the error message
 */
const parseBody = async (res) => {
  let text = await res.text();
  try{
    let json = JSON.parse(text)
    return json;
  } catch {
    return text;
  }
}
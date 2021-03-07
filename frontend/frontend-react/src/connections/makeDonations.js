/**
 * @fileoverview This file should handle getting transactions and making donations from them
 * @author Chris Koehne <cdkoehne@gmail.com>
 * @author Tom Appenzeller <tomapp3@gmail.com>
 *
 */

import jwt_decode from 'jwt-decode';

let BASE = 'http://localhost:5000';

export const getTransactions = async (accessToken) => {
  let res = await fetch(BASE + '/api/transactions/' + accessToken, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  let parsed = await parseBody(res);
  console.log(parsed);
  return { status: res.status, transactions: parsed.transactions };
};

/**
 * This function updates the user's donations array
 * @param {String} jwt the jwt
 * @param {Array} the donations array
 * @return {String} a jwt or error message
 */
export const updateDonations = async (jwt, donations) => {
  let id = jwt_decode(jwt).id;
  let data = {
    id: id,
    donations: donations,
  };

  let res = await fetch(BASE + '/users/update-donations', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + jwt,
    },
    body: JSON.stringify(data),
  });

  return { status: res.status, message: await parseBody(res) };
};

export const getDonationsFromTransactions = async(user, transactions, activityHistory) => {
  // console.log("in the getdonationsfromtransactions func");
  // console.log(transactions);
  // console.log(activityHistory);
  let donations = transactions.map((transaction) => {
    // take the transaction and process it into an object which is {timeDonated, charity, amount}
    let amount = Math.round(
      (Math.ceil(transaction.amount) - transaction.amount) * 100
    ) / 100;
    let charity = findCharity(transaction, activityHistory);
    let timeDonated = transaction.date;
    let email = user.email;
    let temp = {timeDonated: timeDonated, charity: charity, amount: amount, email: email};
    return temp;
  });
  return donations;
};

/**
 * This function calculates the donations array
 * @param {Object} transaction the transaction to find the charity for
 * @param {Array} activityHistory the user's activity history
 * @return {String} the charity the transaction maps to
 */
const findCharity = (transaction, activityHistory) => {
  activityHistory.reverse();
  let mostRecent = Date.parse(
    new Date(activityHistory[0].timeStarted).toISOString().slice(0, 10)
  );
  let transactionDate = Date.parse(transaction.date);
  let matchingActivity = activityHistory.find((activity) => {
    let time = Date.parse(
      new Date(activity.timeStarted).toISOString().slice(0, 10)
    );
    return activity.active === true && time >= mostRecent;
  });
  // console.log("charity is")
  // console.log(matchingActivity.charity);
  return matchingActivity.charity;
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

// let jwt = window.localStorage.getItem('jwt')
// 		let user = await getUser(jwt);
// 		const accessToken = user.message.accessToken;
// 		console.log(accessToken)

// export const transactionsToDonations = async (
//   transactions,
//   activityHistory,
//   donationHistory
// ) => {
//   activityHistory.reverse();
//   donationHistory.reverse();
//   let recentAsString;
//   if (donationHistory.length === 0) {
//     recentAsString = new Date(activityHistory[0].timeStarted)
//       .toISOString()
//       .slice(0, 10);
//   } else {
//     recentAsString = new Date(donationHistory[0].timeDonated)
//       .toISOString()
//       .slice(0, 10);
//   }
//   let mostRecentDonationDate = Date.parse(recentAsString);
//   console.log('most recent date is');
//   console.log(mostRecentDonationDate);

//   transactions.filter();
// };

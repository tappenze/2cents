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

export const transactionsToDonations = async (
  transactions,
  activityHistory,
  donationHistory
) => {
  activityHistory.reverse();
  donationHistory.reverse();
  let recentAsString;
  if (donationHistory.length === 0) {
    recentAsString = new Date(activityHistory[0].timeStarted)
      .toISOString()
      .slice(0, 10);
  } else {
    recentAsString = new Date(donationHistory[0].timeDonated)
      .toISOString()
      .slice(0, 10);
  }
  let mostRecentDonationDate = Date.parse(recentAsString);
  console.log('most recent date is');
  console.log(mostRecentDonationDate);

  transactions.filter()

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

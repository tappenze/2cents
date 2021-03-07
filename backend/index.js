/**
 * @fileoverview This file initializes and sets up all routes and methods for the backend to run
 * @author Chris Koehne <cdkoehnegmail.com>
 */

// Making a small change to test deployment

/**
 * The weird symbols at the start is to set the color of the console.log
 * It is not required, just makes the output easier to read
 */
console.log("\x1b[36m%s\x1b[0m", "Starting BACKEND...");

/**
 * imports all libraries we need for this file
 * You do not need to import all libraries for the whole project here.
 * If a separate file requires different imports, you can do it just in that specific file
 */
const util = require("util");
const express = require("express");
const path = require("path");
require("dotenv").config();
var cors = require("cors");
const plaid = require("plaid");

const moment = require("moment");

const mongoose = require("mongoose");

const PLAID_PRODUCTS = (process.env.PLAID_PRODUCTS || "transactions").split(
  ","
);

const PLAID_COUNTRY_CODES = (process.env.PLAID_COUNTRY_CODES || "US").split(
  ","
);

const PLAID_REDIRECT_URI = process.env.PLAID_REDIRECT_URI || "";

// Parameter used for OAuth in Android. This should be the package name of your app,
// e.g. com.plaid.linksample
const PLAID_ANDROID_PACKAGE_NAME = process.env.PLAID_ANDROID_PACKAGE_NAME || "";

// We store the access_token in memory - in production, store it in a secure
// persistent data store
let ACCESS_TOKEN = null;
let PUBLIC_TOKEN = null;
let ITEM_ID = null;

const client = new plaid.Client({
  clientID: "6042cfb7d34cf5000f804f33",
  secret: "889ae08aa112ff6bef2cdc72b31252",
  env: plaid.environments["sandbox"],
  options: {
    version: "2019-05-29",
  },
});
console.log(client);

/**
 * connection to MongoDB Atlas Users database
 * the connection to the specific database is handled in other files
 */
const defaultURI = process.env.ATLAS_URI;

mongoose.connect(defaultURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("MongoDB Connected…");
});

/**
 * require bcrypt for hashing
 */
const bcrypt = require("bcrypt");

/**
 * Initialize the express server
 */
const app = express();

/**
 * Check for development or production mode.
 * In development mode, we will disable CORS restrictions
 * When the website is deployed, we switch to production mode and enable CORS restrictions
 *
 * CORS restrictions enhance the security of the website
 */
if (process.env.REACT_APP_RUNTIME !== "production") {
  console.log("Running in DEVELOPMENT mode. CORS restrictions are DISABLED.");
  app.use(cors());
} else {
  console.log("Running in PRODUCTION mode. CORS restrictions are ENABLED.");
  /**
   * whitelist will store all the domains that the backend can be called from
   * For example, if the frontend is hosted at foo.com, we need to add "https://foo.com/" and "https://foo.com" to the whitelist
   * The "/" at the end is needed because some browsers will add a slash and some will not
   */
  var whitelist = [];
  app.use(
    cors({
      origin: function (origin, callback) {
        /**
         * If we can find a match in the whitelist, we return true
         */
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          /**
           * Otherwise we throw a new Error
           * This will crash the backend, but when deployed it will automatically restart
           * Crashing the backend is the easiest way to get crash information
           */
          callback(new Error("Not allowed by CORS"));
        }
      },
    })
  );
}

//added for body parsing of requests
app.use(express.json());

/**
 * This is an example of a endpoint.
 * All endpoints we will use in the future should be declared in separate files
 */
app.get("/hello", function (req, res) {
  res.send("Hello World");
});

app.use(require(path.resolve(__dirname, "./Routers/userRouter")));

/**
 * when deployed, the website will need to dynamically get a port number.
 * If the port number is not defined, we will default to 5000
 */
const PORT = process.env.PORT || 5000;

/**
 * Finally, after we have finished adding all the endpoints we want, we tell the app to listen on the desired port.
 */
app.listen(PORT, () => {
  console.log("\x1b[36m%s\x1b[0m", "Startup Successful, BACKEND is ONLINE");
  console.log(`BACKEND listening on port ${PORT}...`);
});

// Create a link token with configs which we can then use to initialize Plaid Link client-side.
// See https://plaid.com/docs/#create-link-token
app.post("/api/create_link_token", function (request, response, next) {
  console.log("creating link token");
  const configs = {
    user: {
      // This should correspond to a unique id for the current user.
      client_user_id: "user-id",
    },
    client_name: "2cents",
    products: PLAID_PRODUCTS,
    country_codes: PLAID_COUNTRY_CODES,
    language: "en",
  };

  if (PLAID_REDIRECT_URI !== "") {
    configs.redirect_uri = PLAID_REDIRECT_URI;
  }

  if (PLAID_ANDROID_PACKAGE_NAME !== "") {
    configs.android_package_name = PLAID_ANDROID_PACKAGE_NAME;
  }

  client.createLinkToken(configs, function (error, createTokenResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error,
      });
    }
    response.json(createTokenResponse);
  });
});

app.post("/get_link_token", async (req, res) => {
  const response = await client.getLinkToken(linkToken).catch((err) => {
    if (!linkToken) {
      return "no link token";
    }
  });
});

// Create a link token with configs which we can then use to initialize Plaid Link client-side.
// See https://plaid.com/docs/#payment-initiation-create-link-token-request
app.post(
  "/api/create_link_token_for_payment",
  function (request, response, next) {
    client.createPaymentRecipient(
      "Harry Potter",
      "GB33BUKB20201555555555",
      {
        street: ["4 Privet Drive"],
        city: "Little Whinging",
        postal_code: "11111",
        country: "GB",
      },
      function (error, createRecipientResponse) {
        const recipientId = createRecipientResponse.recipient_id;

        client.createPayment(
          recipientId,
          "paymentRef",
          {
            value: 12.34,
            currency: "GBP",
          },
          function (error, createPaymentResponse) {
            if (error != null) {
              prettyPrintResponse(error);
              return response.json({
                error: error,
              });
            }
            prettyPrintResponse(createPaymentResponse);
            const paymentId = createPaymentResponse.payment_id;
            PAYMENT_ID = paymentId;
            const configs = {
              user: {
                // This should correspond to a unique id for the current user.
                client_user_id: "user-id",
              },
              client_name: "Plaid Quickstart",
              products: PLAID_PRODUCTS,
              country_codes: PLAID_COUNTRY_CODES,
              language: "en",
              payment_initiation: {
                payment_id: paymentId,
              },
            };
            if (PLAID_REDIRECT_URI !== "") {
              configs.redirect_uri = PLAID_REDIRECT_URI;
            }
            client.createLinkToken(
              {
                user: {
                  // This should correspond to a unique id for the current user.
                  client_user_id: "user-id",
                },
                client_name: "Plaid Quickstart",
                products: PLAID_PRODUCTS,
                country_codes: PLAID_COUNTRY_CODES,
                language: "en",
                redirect_uri: PLAID_REDIRECT_URI,
                payment_initiation: {
                  payment_id: paymentId,
                },
              },
              function (error, createTokenResponse) {
                if (error != null) {
                  prettyPrintResponse(error);
                  return response.json({
                    error,
                  });
                }
                response.json(createTokenResponse);
              }
            );
          }
        );
      }
    );
  }
);

// Exchange token flow - exchange a Link public_token for
// an API access_token
// https://plaid.com/docs/#exchange-token-flow
app.post("/api/get_access_token", function (request, response, next) {
  console.log("getting access token from link token");
  console.log(request.body);
  console.log(request.body.publicToken);
  PUBLIC_TOKEN = request.body.publicToken;
  client.exchangePublicToken(PUBLIC_TOKEN, function (error, tokenResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error,
      });
    }
    console.log("the responses are");
    console.log(tokenResponse);
    ACCESS_TOKEN = tokenResponse.access_token;
    ITEM_ID = tokenResponse.item_id;
    // prettyPrintResponse(tokenResponse);
    response.json({
      access_token: ACCESS_TOKEN,
      item_id: ITEM_ID,
      error: null,
    });
  });
});

// Retrieve an Item's accounts
// https://plaid.com/docs/#accounts
app.get("/api/accounts", function (request, response, next) {
  client.getAccounts(ACCESS_TOKEN, function (error, accountsResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error,
      });
    }
    prettyPrintResponse(accountsResponse);
    response.json(accountsResponse);
  });
});

// Retrieve ACH or ETF Auth data for an Item's accounts
// https://plaid.com/docs/#auth
app.get("/api/auth", function (request, response, next) {
  client.getAuth(ACCESS_TOKEN, function (error, authResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error,
      });
    }
    prettyPrintResponse(authResponse);
    response.json(authResponse);
  });
});

// Retrieve Transactions for an Item
// https://plaid.com/docs/#transactions
app.get("/api/transactions/:accessToken", function (request, response, next) {
  // Pull transactions for the Item for the last 30 days
  console.log("In the get transactions part of the backend");
  // console.log(request.params);
  const startDate = moment().subtract(30, "days").format("YYYY-MM-DD");
  const endDate = moment().format("YYYY-MM-DD");
  const ACCESS_TOKEN = request.params.accessToken;
  client.getTransactions(
    ACCESS_TOKEN,
    startDate,
    endDate,
    {
      count: 250,
      offset: 0,
    },
    function (error, transactionsResponse) {
      if (error != null) {
        // prettyPrintResponse(error);
        return response.json({
          error,
        });
      } else {
        // console.log(transactionsResponse);
        // prettyPrintResponse(transactionsResponse);
        response.json(transactionsResponse);
      }
    }
  );
});

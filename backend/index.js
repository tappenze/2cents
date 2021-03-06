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
const express = require("express");
const path = require("path");
require("dotenv").config();
var cors = require("cors");

const mongoose = require("mongoose");

/**
 * connection to MongoDB Atlas Users database
 * the connection to the specific database is handled in other files
 */
const defaultURI =
  process.env.ATLAS_URI;

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
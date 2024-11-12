// server/index.js or server.js
const dotenv = require("dotenv");
const environment = process.env.NODE_ENV || "development";
dotenv.config({
  path: environment === "production" ? ".env.production" : ".env",
});

const express = require("express");
const db = require("../data/dbConfig.js");
const AccountsRouter = require("../data/seeds/accounts");
const server = express();

server.use(express.json());
server.use("/", AccountsRouter);

module.exports = server;

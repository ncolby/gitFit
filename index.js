const express = require("express");
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
require("dotenv").config();

const server = express();
const client = new MongoClient(process.env.DB_CONNECTION_URL);
const PORT = 3000;

client.connect().then(async () => {
  server.listen(PORT, () => {
    console.log("Server listening...");
  });
});

const db = client.db("gitFitDB");

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
  const db = client.db("gitFitDB");
  const workouts = db.collection("linksNthings");
  const allWorkouts = await workouts.find().toArray();
  console.log(allWorkouts);
  // workouts.insertOne({
  //   name: "sit-ups",
  //   groups: [
  //     "rectus abdominis",
  //     "obliques",
  //     "hip flexors",
  //     "chest",
  //     "neck",
  //     "core",
  //   ],
  //   description:
  //     "A physical exercise designed to strengthen the abdominal muscles, in which a person sits up from a supine position without using the arms for leverage.",
  //   video: "https://www.youtube.com/watch?v=jDwoBqPH0jk",
  //   photo:
  //     "https://img2.thejournal.ie/article/1773996/river?version=1774226&width=1340",
  // });
});

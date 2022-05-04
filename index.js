const express = require("express");
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const server = express();
const client = new MongoClient(process.env.DB_CONNECTION_URL);
const PORT = 3000;

const { auth } = require("express-openid-connect");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_ZERO_SECRET,
  baseURL: "http://localhost:3000",
  clientID: process.env.AUTH_ZERO_CLIENT_ID,
  issuerBaseURL: "https://dev-kdrnv99d.us.auth0.com",
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
server.use(auth(config));
server.use(cors());
// req.isAuthenticated is provided from the auth router
server.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

client.connect().then(async () => {
  server.listen(PORT, () => {
    console.log("Server listening...");
  });

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

server.get("/workouts", async (req, res, next) => {
  console.log("got to first line");
  const db = client.db("gitFitDB");
  const workouts = db.collection("linksNthings");
  const allWorkouts = await workouts.find().toArray();
  // console.log(allWorkouts);
  res.send(allWorkouts);
});

server.get("/workout/:name", async (req, res, next) => {
  console.log("route hit");
  const db = client.db("gitFitDB");
  const workouts = db.collection("linksNthings");
  const { name } = req.params;
  console.log("this is the name", name);
  if (name) {
    console.log("first conditional hit");
    const workoutRes = await workouts.find({ name: name }).toArray();
    if (workoutRes) {
      return res.status(200).send(workoutRes);
    }
    return res
      .status(404)
      .send({ error: `workout with name ${name} not found` });
  }
});

server.get("/workout/musclegroup/:musclegroup", async (req, res, next) => {
  console.log("muscle group hit");
  const db = client.db("gitFitDB");
  const workouts = db.collection("linksNthings");
  const { musclegroup } = req.params;
  if (musclegroup) {
    console.log("first check hit");
    const groupRes = await workouts.find({ groups: musclegroup }).toArray();
    if (groupRes) {
      return res.status(200).send(groupRes);
    }
  }
});

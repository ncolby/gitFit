const express = require("express");
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
require("dotenv").config();

const server = express();
const client = new MongoClient(process.env.DB_CONNECTION_URL);
const PORT = 3000;

// * Start of Auth0 implementation
const { auth, requiresAuth } = require("express-openid-connect");

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

server.get("/profile", requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});
// * End of Auth0 implementation

// req.isAuthenticated is provided from the auth router
server.get("/", (req, res) => {
    res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

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

import express from "express";
import {Db, MongoClient, ObjectId} from "mongodb";
import bodyParser from "body-parser";
import cors from "cors";

require("dotenv").config();

const app = express();
const port = 8080; // default port to listen
// const ObjectId = require('mongodb').ObjectID;

let db: Db;

// middleware
app.use(cors({
  origin: 'http://localhost:3000'
}))

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

// Route definitions
app.get("/", async (req, res) => {
  return res.send("Welcome to Workout Tracker!");
});

app.get("/exercises", async (req, res) => {
    const collection = db.collection("exercises");
    const result = await collection.find({}).toArray()
    return res.json(result);
});

app.post("/exercises", async (req, res) => {
    const postBodyData = req.body;
    const collection = db.collection("exercises");
    const newExercise = {
        title: postBodyData.title,
        workout: postBodyData.workout,
        time: postBodyData.time,
        body: postBodyData.body,
        createdAt: new Date()
    };
    try {
        await collection.insertOne(newExercise);
        return res.json(newExercise);
    } catch (e) {
        return res.status(500).send();
    }
});

app.delete("/exercises/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    const collection = db.collection("exercises");
    try {
        console.log("deleting post with id ", req.params.id);
        await collection.deleteOne(query);
        return res.status(200).send();
    } catch (e) {
        return res.status(500).send();
    }
  });

app.get("/suggestions", async (req, res) => {
    const collection = db.collection("suggestions");
    const result = await collection.find({}).toArray()
    return res.json(result);
});

app.post("/suggestions", async (req, res) => {
    const postBodyData = req.body;
    const collection = db.collection("suggestions");
    const newPrompt = {
        ft: postBodyData.ft,
        in: postBodyData.in,
        lbs: postBodyData.lbs,
        goal: postBodyData.goal,
        suggestion: postBodyData.suggestion,
        createdAt: new Date()
    };
    try {
        await collection.insertOne(newPrompt);
        console.log("inserted new prompt");
        return res.json(newPrompt);
    } catch (e) {
        return res.status(500).send();
    }
});

app.delete("/suggestions/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    const collection = db.collection("suggestions");
    try {
        console.log("deleting suggestion with id ", req.params.id);
        await collection.deleteOne(query);
        return res.status(200).send();
    } catch (e) {
        return res.status(500).send();
    }
  });

// start the Express server
function start() {
    const client = new MongoClient(process.env.ATLAS_URI);
    client.connect()
        .then(() => {
            console.log('Connected successfully to server');
            db = client.db("database");
            app.listen(port, () => {
                console.log(`server started at http://localhost:${port}`);
            });
        })
        .catch(() => {
            console.log("error connecting to mongoDB!");
        });
}

start();
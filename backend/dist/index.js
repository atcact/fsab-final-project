"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
require("dotenv").config();
const app = (0, express_1.default)();
const port = 8080; // default port to listen
let db;
// middleware
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000'
}));
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
// Route definitions
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.send("Welcome to Workout Tracker!");
}));
// TODO: Implement a route handler that returns a list of all posts, ordered by date created.
app.get("/exercises", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.send("TODO: GET /posts");
    const collection = db.collection("exercises");
    const result = yield collection.find({}).toArray();
    return res.json(result);
}));
// TODO: Implement a route handler that creates a new post.
app.post("/exercises", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.send("TODO: POST /posts");
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
        yield collection.insertOne(newExercise);
        return res.json(newExercise);
    }
    catch (e) {
        return res.status(500).send();
    }
}));
// TODO: Implement a route handler that gets a post associated with a given postID.
app.get("/posts/:postID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.send("TODO: GET /posts/{postID}");
    const postID = req.params.postID;
    const collection = db.collection("posts");
    try {
        const result = yield collection.findOne({ "_id": new mongodb_1.ObjectId(postID) });
        return res.json(result);
    }
    catch (e) {
        return res.status(404).send(`no course found with id ${postID}`);
    }
}));
// TODO: Implement a route handler that updates the post associated with a given postID.
app.patch("/posts/:postID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.send("TODO: PATCH /posts/{postID}");
    const postID = req.params.postID;
    const data = req.body;
    const collection = db.collection("posts");
    try {
        const result = yield collection.updateOne({ "_id": new mongodb_1.ObjectId(postID) }, { $set: data });
        return res.json(result);
    }
    catch (e) {
        return res.status(404).send(`no course found with id ${postID}`);
    }
}));
// TODO: Implement a route handler that deletes the post associated with a given postID.
app.delete("/posts/:postID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.send("TODO: DELETE /posts/{postID}");
    const postID = req.params.postID;
    const collection = db.collection("posts");
    try {
        const result = yield collection.deleteOne({ "_id": new mongodb_1.ObjectId(postID) });
        return res.json(result);
    }
    catch (e) {
        return res.status(404).send(`no post found with id ${postID}`);
    }
}));
// TODO: Implement a route handler that gets all the comments associated with a given postID.
app.get("/posts/:postID/comments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.send("TODO: GET /posts/{postID}/comments");
    const postID = req.params.postID;
    const collection = db.collection("comments");
    try {
        const result = yield collection.find({ "post": new mongodb_1.ObjectId(postID) }).toArray();
        return res.json(result);
    }
    catch (e) {
        return res.status(404).send(`no comments for the post found with id ${postID}`);
    }
}));
// TODO: Implement a route handler that gets adds a comment to the post with the given postID.
app.post("/posts/:postID/comments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.send("TODO: POST /posts/{postID}/comments");
    const postID = req.params.postID;
    const postBodyData = req.body;
    const collection = db.collection("comments");
    const newComment = { content: postBodyData.content, post: new mongodb_1.ObjectId(postID), createdAt: new Date() };
    try {
        yield collection.insertOne(newComment);
        return res.json(newComment);
    }
    catch (e) {
        return res.status(500).send();
    }
}));
// TODO: Implement a route handler that gets a comment associated with the given commentID.
app.get("/posts/:postID/comments/:commentID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.send("TODO: GET /posts/{postID}/comments/{commentID}");
    const commentID = req.params.commentID;
    const collection = db.collection("comments");
    try {
        const result = yield collection.findOne({ "_id": new mongodb_1.ObjectId(commentID) });
        return res.json(result);
    }
    catch (e) {
        return res.status(404).send(`no post found with id ${commentID}`);
    }
}));
// TODO: Implement a route handler that updates a comment associated with the given commentID.
app.patch("/posts/:postID/comments/:commentID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.send("TODO: PATCH /posts/{postID}/comments");
    const commentID = req.params.commentID;
    const data = req.body;
    const collection = db.collection("comments");
    try {
        const result = yield collection.updateOne({ "_id": new mongodb_1.ObjectId(commentID) }, { $set: data });
        return res.json(result);
    }
    catch (e) {
        return res.status(404).send(`no comment found with id ${commentID}`);
    }
}));
// TODO: Implement a route handler that deletes a comment associated with the given commentID.
app.delete("/posts/:postID/comments/:commentID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.send("TODO: DELETE /posts/{postID}/comments");
    const commentID = req.params.commentID;
    const collection = db.collection("comments");
    try {
        const result = yield collection.deleteOne({ "_id": new mongodb_1.ObjectId(commentID) });
        return res.json(result);
    }
    catch (e) {
        return res.status(404).send(`no comment found with id ${commentID}`);
    }
}));
// ... add more endpoints here!
// start the Express server
function start() {
    const client = new mongodb_1.MongoClient(process.env.ATLAS_URI);
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
//# sourceMappingURL=index.js.map
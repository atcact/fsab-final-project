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
app.get("/exercises", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = db.collection("exercises");
    const result = yield collection.find({}).toArray();
    return res.json(result);
}));
app.post("/exercises", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
app.get("/suggestions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = db.collection("suggestions");
    const result = yield collection.find({}).toArray();
    return res.json(result);
}));
app.post("/suggestions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield collection.insertOne(newPrompt);
        return res.json(newPrompt);
    }
    catch (e) {
        return res.status(500).send();
    }
}));
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
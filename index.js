require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Buat front-end bisa akses API (klo jadi pake wkwk)
const connectDB = require("./config/db");
const { errorHandler, notFoundHandler } = require("./middlewares/errorHandler");

const app = express();

// Connect ke MongoDBnya
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(notFoundHandler);
app.use(errorHandler);

const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

import dotenv from "dotenv";
import express from "express";
import { fileURLToPath } from "url";
import multer from "multer";
import path from "path";
import morgan from "morgan";
import mainRouter from "./routes/routes.js";
import fs from "fs";
import bodyParser from "body-parser";
import { fileStorage, fileFilter } from "./utils/files.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).fields([
    { name: "images", maxCount: 100 },
    { name: "videos", maxCount: 100 },
  ])
);

// That's morgan for tracking the api in the terminal
// Will be removed later
app.use(morgan("dev"));

// Log stream for morgan to make the log file in the server
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  {
    flags: "a",
  }
);

app.use(
  morgan("combined", {
    stream: accessLogStream,
  })
);

app.use("/images", express.static(path.join(__dirname, "images")));

app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,PATCH,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.listen(PORT, () => {
  console.log(`Started on port ${PORT}`);
});

app.use(mainRouter);

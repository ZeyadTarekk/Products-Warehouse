import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mainRouter from "./routes/routes.js";
import bodyParser from "body-parser";
const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

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

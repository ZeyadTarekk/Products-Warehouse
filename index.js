import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mainRouter from "./routes/routes.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.listen(PORT, () => {
  console.log(`Started on port ${PORT}`);
});

app.use(mainRouter);

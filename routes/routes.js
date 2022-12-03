import express from "express";
import customerRouter from "./customerRouter.js";

const mainRouter = express.Router();

mainRouter.use(customerRouter);

export default mainRouter;

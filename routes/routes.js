import express from "express";
import customerRouter from "./customerRouter.js";
import productRouter from "./productRouter.js";
const mainRouter = express.Router();

mainRouter.use(customerRouter);
mainRouter.use(productRouter);

export default mainRouter;

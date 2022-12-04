import express from "express";
import customerRouter from "./customerRouter.js";
import productRouter from "./productRouter.js";
import warehouseRouter from "./warehouseRouter.js";
const mainRouter = express.Router();

mainRouter.use(customerRouter);
mainRouter.use(productRouter);
mainRouter.use(warehouseRouter);

export default mainRouter;

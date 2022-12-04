import express from "express";
import { body } from "express-validator";
import { verifyAuthToken } from "../middleware/verifyAuthToken.js";
import warehouseContoller from "../controllers/warehouseContoller.js";

const warehouseRouter = express.Router();

warehouseRouter.post(
  "/warehouse",
  verifyAuthToken,
  body("name", "Name is required").notEmpty().trim(),
  body("description", "description is required").notEmpty().trim(),
  body("city", "city is required").notEmpty().trim(),
  body("lat", "lat is required").notEmpty().trim(),
  body("long", "long is required").notEmpty().trim(),
  warehouseContoller.createWarehouse
);

warehouseRouter.get(
  "/warehouse/:warehouseId",
  verifyAuthToken,
  warehouseContoller.getWarehouse
);

warehouseRouter.get(
  "/warehouse",
  verifyAuthToken,
  warehouseContoller.getWarehouses
);

warehouseRouter.delete(
  "/warehouse/:warehouseId",
  verifyAuthToken,
  warehouseContoller.deleteWarehouse
);

warehouseRouter.put(
  "/warehouse/:warehouseId",
  verifyAuthToken,
  body("name", "Name is required").notEmpty().trim(),
  body("description", "description is required").notEmpty().trim(),
  body("city", "city is required").notEmpty().trim(),
  body("lat", "lat is required").notEmpty().trim(),
  body("long", "long is required").notEmpty().trim(),
  warehouseContoller.updateWarehouse
);

export default warehouseRouter;

import express from "express";
import { body } from "express-validator";
import customerController from "../controllers/customerController.js";
const customerRouter = express.Router();

customerRouter.post(
  "/customer",
  body("name", "Name is required").notEmpty().trim(),
  body("email", "email is required").notEmpty().trim(),
  body("email", "Enter a valid email").isEmail().trim(),
  body("phone", "phone is required").notEmpty().trim(),
  body("city", "city is required").notEmpty().trim(),
  body("lat", "lat is required").notEmpty().trim(),
  body("long", "long is required").notEmpty().trim(),
  customerController.createCustomer
);

export default customerRouter;

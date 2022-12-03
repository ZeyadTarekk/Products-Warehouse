import express from "express";
import { body } from "express-validator";
import { verifyAuthToken } from "../middleware/verifyAuthToken.js";
import productController from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post(
  "/product",
  verifyAuthToken,
  body("name", "Name is required").notEmpty().trim(),
  body("description", "description is required").notEmpty().trim(),
  body("price", "price is required").notEmpty().trim(),
  productController.createdProduct
);

productRouter.get(
  "/product/:productId",
  verifyAuthToken,
  productController.getProduct
);

productRouter.delete(
  "/product/:productId",
  verifyAuthToken,
  productController.deleteProduct
);

productRouter.get("/product", verifyAuthToken, productController.getProducts);

productRouter.put(
  "/product/:productId",
  verifyAuthToken,
  body("name", "Name is required").notEmpty().trim(),
  body("description", "description is required").notEmpty().trim(),
  body("price", "price is required").notEmpty().trim(),
  productController.updateProduct
);

export default productRouter;

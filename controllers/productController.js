import Product from "../models/product.js";
import { validationResult } from "express-validator";
const createdProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // console.log(errors.array());
      return res.status(400).json({
        error: errors.array()[0].msg,
      });
    }

    const { name, description, price } = req.body;
    const product = new Product(name, description, price);
    const createdProduct = await product.save();
    res.status(200).json(createdProduct);
  } catch (err) {
    console.log(err.message);
    if (err.statusCode) {
      res.status(err.statusCode).json({
        error: err.message,
      });
    } else {
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.getProductById(req.params.productId);
    res.status(200).json(product);
  } catch (err) {
    console.log(err.message);
    if (err.statusCode) {
      res.status(err.statusCode).json({
        error: err.message,
      });
    } else {
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }
};

const getProducts = async (_req, res) => {
  try {
    const products = await Product.getProducts();
    res.status(200).json(products);
  } catch (err) {
    console.log(err.message);
    if (err.statusCode) {
      res.status(err.statusCode).json({
        error: err.message,
      });
    } else {
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.deleteProduct(req.params.productId);
    res.status(200).json("product deleted successfully");
  } catch (err) {
    console.log(err.message);
    if (err.statusCode) {
      res.status(err.statusCode).json({
        error: err.message,
      });
    } else {
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }
};

const updateProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // console.log(errors.array());
      return res.status(400).json({
        error: errors.array()[0].msg,
      });
    }

    const { name, description, price } = req.body;
    const updatedProduct = await Product.updateProduct(
      req.params.productId,
      name,
      description,
      price
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.log(err.message);
    if (err.statusCode) {
      res.status(err.statusCode).json({
        error: err.message,
      });
    } else {
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }
};

export default {
  createdProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};

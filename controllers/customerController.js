import Customer from "../models/customer.js";
import { validationResult } from "express-validator";
import { generateToken } from "../services/customerService.js";
const createCustomer = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // console.log(errors.array());
      return res.status(400).json({
        error: errors.array()[0].msg,
      });
    }
    const { name, email, phone, city, lat, long } = req.body;
    const customer = new Customer(name, email, phone, city, lat, long);
    const createCustomer = await customer.save();
    const token = generateToken(createCustomer);
    res.status(201).json({ token: token });
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

const getCustomer = async (req, res) => {
  try {
    const customer = await Customer.getCustomerById(req.params.customerId);
    res.status(200).json(customer);
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

const getCustomers = async (req, res) => {
  try {
    const customer = await Customer.getCustomers();
    res.status(200).json(customer);
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

const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.deleteCustomer(req.params.customerId);
    res.status(200).json("customer deleted successfully");
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
  createCustomer,
  getCustomer,
  getCustomers,
  deleteCustomer,
};

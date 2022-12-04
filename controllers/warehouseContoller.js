import Warehouse from "../models/warehouse.js";
import { validationResult } from "express-validator";

const createWarehouse = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // console.log(errors.array());
      return res.status(400).json({
        error: errors.array()[0].msg,
      });
    }
    const { name, description, city, lat, long } = req.body;
    const warehouse = new Warehouse(name, description, city, lat, long);
    const createWarehouse = await warehouse.save();
    res.status(201).json(createWarehouse);
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

const getWarehouse = async (req, res) => {
  try {
    const warehouse = await Warehouse.getWarehouseById(req.params.warehouseId);
    res.status(200).json(warehouse);
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

const getWarehouses = async (req, res) => {
  try {
    const warehouse = await Warehouse.getWarehouses();
    res.status(200).json(warehouse);
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

const deleteWarehouse = async (req, res) => {
  try {
    await Warehouse.deleteWarehouse(req.params.warehouseId);
    res.status(200).json("warehouse deleted successfully");
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

const updateWarehouse = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // console.log(errors.array());
      return res.status(400).json({
        error: errors.array()[0].msg,
      });
    }

    const { name, description, city, lat, long } = req.body;
    const updatedWarehouse = await Warehouse.updateWarehouse(
      req.params.warehouseId,
      name,
      description,
      city,
      lat,
      long
    );
    res.status(200).json(updatedWarehouse);
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
  createWarehouse,
  getWarehouse,
  getWarehouses,
  deleteWarehouse,
  updateWarehouse,
};

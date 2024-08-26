import Product from "../models/product.model.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";
import fs from "fs-extra";

export const getProducts = async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createProducts = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
    });
    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      newProduct.image = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
      fs.unlink(req.files.image.tempFilePath);
    }
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProducts = async (req, res) => {
  try {
    const productUpdated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    return res.json(productUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProducts = async (req, res) => {
  try {
    const productDeleted = await Product.findByIdAndDelete(req.params.id);
    if (!productDeleted)
      return res.status(404).json({ message: "Product not found" });
    if (productDeleted.image?.public_id) {
      await deleteImage(productDeleted.image.public_id);
    }
    return res.json(productDeleted);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// const { cloudinaryUploadImg } = require("../middleware/uploadImages");
const Products = require('../models/productsModel');


// Upload Product Function (Handles a Single Image)
const uploadProduct = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file provided or invalid format" });
    }

    res.status(201).json({
      url: file.path, // Cloudinary URL
      public_id: file.filename, // Cloudinary public_id
    });
  } catch (error) {
    console.error("Error in uploadProduct:", error);
    res.status(500).json({ error: "Failed to upload image to Cloudinary", details: error });
  }
};

// Multiple Images Upload (Handles Multiple Images)
const uploadProducts = async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files provided or invalid format" });
    }

    const results = files.map((file) => ({
      url: file.path, // Cloudinary URL
      public_id: file.filename, // Cloudinary public_id
    }));

    res.status(201).json({
      images: results,
    });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({ error: "Failed to upload images to Cloudinary", details: error });
  }
};

createProduct = async (req, res) => {
  try {
    await Products.create(req.body);
    res.status(201).json({ message: "Category created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const getProducts = async (req, res) => {
  try {
    // Fetch all categories

    const products = await Products.find({ status: true,  is_supplier: { $exists: false }  }).populate("category_id");
    res.status(200).json(products); // Send the categories as JSON response
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const getAllProducts = async (req, res) => {
  try {
    // Fetch all categories

    const products = await Products.find({ status: true }).populate("category_id");
    res.status(200).json(products); // Send the categories as JSON response
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch all categories

    const product = await Products.findById(id).populate("category_id");
    res.status(200).json(product); // Send the categories as JSON response
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};


const getSupplierProducts = async (req, res) => {
  try {
    // Fetch all categories

    const products = await Products.find({ status: true,  is_supplier: { $exists: true }   }).populate("category_id");
    res.status(200).json(products); // Send the categories as JSON response
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};


module.exports = { createProduct, getProducts, uploadProduct, uploadProducts, getSupplierProducts, getAllProducts, getSingleProduct }

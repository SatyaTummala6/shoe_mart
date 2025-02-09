const ItemCategories = require('../models/itemCategoriesModel');

createItemCategory = async (req, res) => {
    try {
        const { name, description, status } = req.body;

        // Validate required fields
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }

        await ItemCategories.create({ name, description, status });
        res.status(201).json({ message: "Category created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

const getItemCategories = async (req, res) => {
  try {
    // Fetch all categories

    const itmcategories = await ItemCategories.find({ status: true });
    res.status(200).json(itmcategories); // Send the categories as JSON response
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};



module.exports = { createItemCategory, getItemCategories }

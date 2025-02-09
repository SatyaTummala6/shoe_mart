const Categories = require('../models/categoriesModel');

createCategory = async (req, res) => {
    try {
        const { name, description, status } = req.body;

        // Validate required fields
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }

        // Create a new category
        const category = await Categories.create({ name, description, status });
        res.status(201).json({ message: "Category created successfully", category });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

module.exports = { createCategory }

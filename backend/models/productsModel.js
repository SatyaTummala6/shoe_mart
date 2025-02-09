const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "itemCategories",
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    group: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    customer_size: {
        type: String,
        required: true,
    },
    mrp: {
        type: Number,
        required: true,
    },
    rate: {
        type: Number,
        required: true,
    },
    offer_rate: {
        type: Number,
        required: true,
    },
    customer_rate: {
        type: Number,
        required: true,
    },
    inventory_purchase_rate: {
        type: Number,
    },
    description: {
        type: String,
        required: true,
    },
    primary_image: {
        type: String,
        required: true,
    },
    secondary_images: {
        type: [],

    },
    status: {
        type: Boolean,
        default: true,
    },
    is_supplier: {
        type: String,
    },
    min_order: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

//Export the model
module.exports = mongoose.model('Products', productSchema);
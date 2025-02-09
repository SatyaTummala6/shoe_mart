const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderListSchema = new mongoose.Schema({
    order_id: {
        type: mongoose.Schema.ObjectId,
        ref: "orders"
    },
    product_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Products",
        required: true,
    },
    accepted_quantity: {
        type: String,
    },
    requested_quantity: {
        type: String,
        required: true,
    },
    balance_quantity: {
        type: String,
    },
    accepted_total: {
        type: String,
    },
    requested_total: {
        type: String,
        required: true,
    },
    balance_total: {
        type: String,
    },
    size: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
}, { timestamps: true });

//Export the model
module.exports = mongoose.model('orderlist', orderListSchema);
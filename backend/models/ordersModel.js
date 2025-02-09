const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    employee_id: {
        type: mongoose.Schema.ObjectId,
        ref: "clients"
    },
    client_id: {
        type: mongoose.Schema.ObjectId,
        ref: "clients",
        required: true,
    },
    accepted_total_quantity: {
        type: String,
    },
    requested_total_quantity: {
        type: String,
        required: true,
    },
    balance_total_quantity: {
        type: String,
    },
    accepted_grand_total: {
        type: String,
    },
    requested_grand_total: {
        type: String,
        required: true,
    },
    balance_grand_total: {
        type: String,
    },
    order_date: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        default: "Pending",
        enum: ['Pending', 'Accepted', 'Cancelled', 'Completed']
    },
    is_balance_exists: {
        type: Boolean,
        default: false,
    },
    balance_status: {
        type: String,
        default: null,
        enum: ['Pending', 'Accepted', 'Cancelled', 'Completed']
    }
}, { timestamps: true });

//Export the model
module.exports = mongoose.model('orders', orderSchema);
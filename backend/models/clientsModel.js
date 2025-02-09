const mongoose = require('mongoose'); 
const crypto = require('crypto');

// Declare the Schema of the Mongo model
var clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firm_name: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories", 
        required: true,
    },
    
    remarks:{
        type: String
    },
    status: {
        type: Boolean,
        default: false,
    },
    min_order: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
    },
    opening_balance: {
        type: Number,
    },
    refreshToken: { type: String, },
    passwordChangedAt: { type: Date, },
    passwordResetToken: { type: String, },
    passwordResetExpires: { type: Date, },

}, { timestamps: true });

clientSchema.methods.createPasswordResetToken = async function() {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest("hex");
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // Expires in 10 minutes
    return resetToken;
};



//Export the model
module.exports = mongoose.model('clients', clientSchema);
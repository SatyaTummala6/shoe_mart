const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var cartSchema = new mongoose.Schema({
    client_id:{
          type: mongoose.Schema.Types.ObjectId,
                ref: "clients",
                required: true,
    },
    product_id:{
      type: mongoose.Schema.Types.ObjectId,
            ref: "Products",
            required: true,
    },
    quantity:{
        type:String,
        required:true,
    },
    size:{
        type:String,
        required:true,
    },
},{ timestamps: true });

//Export the model
module.exports = mongoose.model('Cart', cartSchema);
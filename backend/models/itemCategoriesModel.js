const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var itemCategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String,
    },
    status:{
        type:Boolean,
        default:true,
    },
    
});

//Export the model
module.exports = mongoose.model('itemCategories', itemCategorySchema);
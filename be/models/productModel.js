const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true,
    },
    img:{
        type:String,
        required:true,
    },
    categories:{
        type:[String]
    },
    price:{
        type:Number,
        required:true
    },
    inStock:{
        type:Boolean,
        default:true
    }
})

module.exports = mongoose.model('products', productSchema)
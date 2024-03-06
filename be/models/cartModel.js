const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    products:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'products'
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ],
},{timestamps:true})

module.exports = mongoose.model('carts', cartSchema)
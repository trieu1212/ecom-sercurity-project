const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
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
    amount:{
        type:Number,
        default:0,
        required:true
    },
    status:{
        type:String,
        default:'pending'
    },
    address:{
        type:{},
        default:''
    },
},{timestamps:true})

module.exports = mongoose.model('orders', orderSchema)
const mongoose = require('mongoose');

const buySchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        items:[
            {
                _id:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'Product',
                    required:true
                },
                quantity:{
                    type:Number,
                    required:true
                }
            }
        ],
        time:{type:Date,default:Date.now}
    },
    {versionKey:false}
)

const BuyModel = mongoose.model("Cart",buySchema);

module.exports={BuyModel}
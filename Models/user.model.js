const mongoose = require('mongoose');
//const ProductModel= require('./product.model')
const userSchema= new mongoose.Schema(
    {
        name:String,
        email:String,
        pass:String,
        cart:[{
            product_id:String,
            quantity:Number
        }],
        orders:[{
            product_id:String,
            quantity:Number
        }],
        addresses:[{}]
    },
    {
        versionKey:false
    }
)

const UserModel= mongoose.model("User",userSchema);
module.exports= {UserModel}
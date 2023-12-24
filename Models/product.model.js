const mongoose= require('mongoose');

const productSchema= new mongoose.Schema(
    {
        name:String,
        price:Number,
        desc:String,
        quantity:{type:Number,default:1},
        sellerId:String,
        image:String,
        AdminDiscount:{type:Number,default:0},
        SellerDiscount:{type:Number,default:0}
    },
    {versionKey:false}
);

const ProductModel= mongoose.model("Product",productSchema);

module.exports= {ProductModel}
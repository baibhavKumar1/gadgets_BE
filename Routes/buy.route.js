const express = require('express');
const { BuyModel } = require('../Models/buy.model');
const BuyRouter = express.Router();
const { auth } = require('../Middleware/auth.middleware');
const { ProductModel } = require('../Models/product.model');
const { UserModel } = require('../Models/user.model');
BuyRouter.use(auth);

BuyRouter.get("/", async(req, res) => {
    const userId= req.body.userId;
    try{
        const user = await BuyModel.find({user:userId});
        if(!user){
            res.status(400).send('no orders found');
        }
        res.status(200).send(user)
    }catch(err){
        res.status(400).send(err.message)
    }
})

BuyRouter.post('/cart', async (req, res) => {
    try {
        const { quantity,productID } = req.body;
        const userId = req.body.userId;
        const user = await UserModel.findById(userId);
        const product = await ProductModel.findById(productID);
        if (userId == product.sellerId) {
            return res.status(400).send("Seller can't buy back");
        }
        const existingCartItem = user.cart.find(item => item.product_id == productID);
        if (existingCartItem) {
            existingCartItem.quantity += quantity;
        } else {
            user.cart.push({ _id: productID, quantity });
        }
        await user.save()
        res.status(200).send(user)
    } catch (err) {
    res.status(400).json({ "message": err.message })
}
})
// BuyRouter.post('/order/:id', async (req, res) => {
//     try {
//         const { quantity } = req.body;
//         const productID = req.params.id;
//         const userId = req.body.userId;
//         const user = await UserModel.findById(userId);
//         const product = await ProductModel.findById(productID);
//         console.log(user, product)
//         if (userId == product.sellerId) {
//             return res.status(400).send("Seller can't buy back");
//         }
//         const existingCartItem = user.cart.find(item => item.product_id == productID);
//         if (existingCartItem) {
//             existingCartItem.quantity += quantity;
//         } else {
//             user.cart.push({ _id: productID, quantity });
//         }
//         await user.save()
//         res.status(200).send(user)
//     } catch (err) {
//     res.status(400).json({ "message": err.message })
// }
// })

BuyRouter.post('/order', async (req, res) => {
    try {
        const orderItems = req.body.orderItems || [];
        if (orderItems.length === 0) {
            return res.status(400).send('No order items provided');
        }
        const userId = req.body.userId;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const order = new BuyModel({
            user: userId,
            items: orderItems.map(item => ({
                _id: item._id,
                quantity: item.quantity || 1,
            })),
        });
        await order.save();
        res.json({ order });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

module.exports = { BuyRouter }
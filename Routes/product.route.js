const express = require('express');
const { ProductModel } = require('../Models/product.model');
const ProductRouter = express.Router();
const { auth } = require('../Middleware/auth.middleware');
const { UserModel } = require('../Models/user.model');

ProductRouter.use(auth);

ProductRouter.get('/', async (req, res) => {
    try {
        const product = await ProductModel.find();
        res.status(200).send(product)
    }
    catch (err) {
        res.status(400).send({ "message": err.message })
    }
})

ProductRouter.post('/add', async (req, res) => {
    const { name, price, desc, quantity,image, userId } = req.body;
    try {
        const verify = await ProductModel.findOne({ name: { $regex: new RegExp('^' + name + '$', 'i') } });
        if (verify) {
            res.status(400).json({ message: "Product already exists" });
        } else {
            const newProduct = new ProductModel({ name, price,image, desc, quantity, sellerId: userId });
            await newProduct.save()
            res.status(200).send({ message: "Product added", newProduct })
        }
    }
    catch (error) {
        res.status(400).send(error.message)
    }
})

ProductRouter.patch('/update/:id', async (req, res) => {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    try {
        if (req.body.userId == product.sellerId) {
            const updated = await ProductModel.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).json({ message: "updated", updated })
        } else {
            res.status(400).send('Unauthorised')
        }
    }
    catch (err) {
        res.status(400).send(err.message)
    }
})

ProductRouter.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    try {
        if (req.body.userId == product.sellerId) {
            const deleted = await ProductModel.findByIdAndDelete(id);
            res.status(200).json({ message: "deleted", deleted })
        } else {
            res.status(400).send('Unauthorised')
        }
    }
    catch (err) {
        res.status(400).send(err.message)
    }
})

module.exports = { ProductRouter }
const express= require('express');
const cors= require('cors');
const {connection}= require('./db');
const app= express();
const {UserRouter} = require('./Routes/user.route');
const { ProductRouter } = require('./Routes/product.route');
const { BuyRouter } = require('./Routes/buy.route');


app.use(cors())
app.use(express.json());
app.use("/users",UserRouter);
app.use("/products",ProductRouter);
app.use("/buy",BuyRouter)

app.listen(3000,async()=>{
    try{
        await connection;
        console.log("connected, running on 3000")
    }
    catch(err){
        console.log(err)
    }
})
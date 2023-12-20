const jwt= require('jsonwebtoken');

const auth= (req,res,next)=>{
    const token= req.headers.authorization?.split(" ")[1];
    if(token){
        const decoded= jwt.verify(token,"contribute");
        if(decoded){
            req.body.userId = decoded.userId;
            next()
        }
        else{
            res.status(400).send({"msg":"Login first"})
        }
    }
    else{
        res.status(400).send({"msg":"Login first"})
    }
}

module.exports={auth}
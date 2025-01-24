const jwt = require("jsonwebtoken")
const {jwt_key}=require("../config")

const authMiddleware = (req,res,next)=>{
    const buffer = req.headers.authorization
    if(!buffer||!buffer.startsWith("Bearer ")){
       return res.send("this is not valid")
    }
    const token = buffer.split(" ")
    const jwt_token = token[1]

    try{
    const decoded = jwt.decode(jwt_token,jwt_key)
    if(decoded){
        req.userId = decoded.userId
        next()
    }else{
        return res.send("you are not authorized")
    }
    }catch(err){
        console.log("error in middleware")
    }

}

module.exports={authMiddleware}
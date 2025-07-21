const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/User")(require("mongoose"));
const JWT_SECRET = process.env.JWT_SECRET || "secret_key_example";

exports.loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if (!email|| !password) {
            return res.status(400).json({error:'Email and password are required.'});
        }
        const user=await User.findOne({email});
        if (!user){
            return res.status(401).json({error:'Invalide email '});
        }    
        const isMatch= await bcrypt.compare(password,user.password);
        if (!isMatch){
            return res.status(401).json({error:'Invalide email '});
        }
        const token=jwt.sign(
            {id:user.id,email:user.email},
            JWT_SECRET,
            {expiresIn:"1h"}
        );
        res.status(200).json({message:'Login succesuful',token });
}catch (err){
    res.status(500).json({error:err.message});
}
};
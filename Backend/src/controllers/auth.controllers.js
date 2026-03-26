import userModel from "../models/user.models";
import bcrypt from "bcrypt";


async function register(req,res){

    try{

        const {username,email,password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({
            message:"All fields are required."
        })
    }

    const user = await userModel.findOne({
       $or:[ {username},
        {email}]
    })

    if(user){
        return response.status(401).json({
            message:"this is all ready exists"
        })
    }


    const passwordHash = bcrypt.hash(password,10); 

    user.username = username 
    user.email = email
    user.password = passwordHash

    await user.save()   

    }
    catch(error){
         res.status(500).json({
            message:error.message,
         })
    }


}
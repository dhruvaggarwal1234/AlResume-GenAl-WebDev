import mongoose from "mongoose";


const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required: [true,"Username is Required"],
        unique:true,
    },

     email:{
        type:String,
        required: [true,"Email is Required"],
        unique:true,
    },

    password:{
        type :String,
        required: [true, "Password is Required"]
    }
    
})

const userModel = mongoose.model("User", userSchema);

export default userModel
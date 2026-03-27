import mongoose from "mongoose";
import userModel from "./user.models.js";


const sessionSchema = new mongoose.Schema({

    userId:{
        type :mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    refreshTokenHash:{
        type:String,
        required:true,},
    ip:{
        type:String,
        required:true,
    },
    userAgent:{
        type:String,
        required:true,
    },
    revoke:{
        type:Boolean,
        default:false
    }


},{timestamps:true})

sessionSchema.index({ userId: 1 });

const sessionModel = mongoose.model("Session" , sessionSchema);

export default sessionModel;
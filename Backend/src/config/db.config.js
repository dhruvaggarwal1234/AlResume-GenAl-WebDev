import mongoose from "mongoose";





async function connectDb(){

    try{
        mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDb Connected Yup.")
    }

    catch(err){
        console.log(err.message)
    }
}

export default connectDb;
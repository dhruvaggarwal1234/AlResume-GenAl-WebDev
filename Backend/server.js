import  configDotenv  from "dotenv";
import app from "./src/app.js";
import connectDb from "./src/config/db.config.js";

configDotenv.config()
connectDb()



app.listen(3000,(req,res)=>{
    
    console.log("Server is the Started....")

})

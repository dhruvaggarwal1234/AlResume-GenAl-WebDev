import  configDotenv  from "dotenv";
import app from "./src/app.js";
import connectDb from "./src/config/db.config.js";

configDotenv.config()
connectDb()


app.get('/',(req,res)=>{

    res.json("this is working")
})

app.listen(3000,()=>{
    
    
    console.log("Server is the Started....")

})

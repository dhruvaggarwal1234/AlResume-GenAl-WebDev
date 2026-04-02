import  configDotenv  from "dotenv";
import app from "./src/app.js";
import connectDb from "./src/config/db.config.js";
import { resume,selfDescription,jobDescription } from "./src/services/temp.js";
import genrateReport from "./src/services/ai.services.js"

configDotenv.config()

connectDb()
genrateReport({resume,selfDescription,jobDescription})


app.get('/',(req,res)=>{

    res.json("this is working")
})

app.listen(3000,()=>{
    
    
    console.log("Server is the Started....")

})

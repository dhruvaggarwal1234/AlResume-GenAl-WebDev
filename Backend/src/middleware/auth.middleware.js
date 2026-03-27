import jwt from "jsonwebtoken"

async function authmiddleware(req,res,next) {

    try{
        const authHeader = req.headers.authorization

           if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "No token provided"
            })
        }

    const accesstoken = req.headers.authorization.split(" ")[1]

    const decoded = jwt.verify(accesstoken,process.env.ACCESS_TOKEN)

    req.user = decoded
    next()
    }catch(error){

        res.status(500).json({
            message:error.message,
        })
    }


    

    }

    export default authmiddleware
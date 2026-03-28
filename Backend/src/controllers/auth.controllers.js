import userModel from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import crypto from "crypto"
import sessionModel from "../models/session.models.js";


async function register(req, res) {

    try {

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required."
            })
        }

        const shortEmail = email.toLowerCase()
        const shortUsername = username.toLowerCase();

        const isExistUser = await userModel.findOne({
            $or: [{ username: shortUsername },
            { email: shortEmail }]
        })

        if (isExistUser) {
            return res.status(409).json({
                message: "User already exists"
            })
        }


        const passwordHash = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username: shortUsername,
            email: shortEmail,
            password: passwordHash
        })

        const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN, { expiresIn: "7d" })


        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")

        const session = await sessionModel.create({
            userId: user._id,
            ip: req.ip,
            userAgent: req.headers["user-agent"],
            refreshTokenHash,
        })

        const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, { expiresIn: "15m" })

        res.status(200).json({
            message: "user Created",
            user: {
                username: user.username,
                email: user.email,
            },
            accessToken,
        })

    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }


}

async function login(req, res) {
    try {

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "Field is required."
            })
        }

        const shortEmail = email.toLowerCase();


        const user = await userModel.findOne({
            email: shortEmail,
        })

        if (!user) {
            return res.status(401).json({
                message: "user does not Exists"
            })
        }


        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }


        const refreshToken = jwt.sign({
            id: user._id,
        }, process.env.REFRESH_TOKEN, { expiresIn: "7d" })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        })

        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")

        await sessionModel.create({
            userId: user._id,
            refreshTokenHash,
            ip: req.ip,
            userAgent: req.headers["user-agent"]
        })


        const accessToken = jwt.sign({ id: user._id },
            process.env.ACCESS_TOKEN,
            { expiresIn: "15m" })


        res.status(200).json({
            message: "Login successfully",
            user: {
                username: user.username,
                email: user.email,
            },
            accessToken,
        })


    }
    catch (error) {

        res.status(500).json({

            message: error.message,
        })
    }

}

async function logout(req, res) {

    try {

        const refreshToken = req.cookies.refreshToken;

        if(!refreshToken){
            res.status(400).json({
                message:"Token not found"
            })
        }

        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")

        console.log(refreshTokenHash)

        const session = await sessionModel.findOne({
            refreshTokenHash:refreshTokenHash,
            revoke: false,
        })

        console.log(session)

        if (!session) {
            return res.status(401).json({
                message: "Invalid Token"
            })
        }

        session.revoke = true
        await session.save();

        res.clearCookie("refreshToken")

        res.status(200).json({
            message: "Logout successfully"
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }



}

async function logoutAll(req, res) {

    try{

        const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        res.status(401).json({
            message: "Token not found."
        })
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN)

    if(!decoded){
        res.status(401).json({
            message:"Invalid token."
        })
    }

    await sessionModel.updateMany({
        userId: decoded.id,
        revoke: false
    }, { revoke: true }
    )

       res.clearCookie("refreshToken")

     return res.status(200).json({
        message:"Logged out from all sessions "
    })

    }catch (error) {

        res.status(500).json({

            message: error.message,
        })
    }


}

async function genrateRefresh(req,res){

    try{

 const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        res.status(401).json({
            message : "No token"
        })
    }

    const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN)
    const refreshTokenHash = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");


    const session = await sessionModel.findOne({
        userId:decoded.id,
        refreshTokenHash,
        revoke:false

           })

         if (!session) {
         return res.status(401).json({
              message: "Invalid session"
          });
         }

         session.revoke = true;
        await session.save();

        const newRefreshToken = jwt.sign(
            { id: decoded.id },
            process.env.REFRESH_TOKEN,
            { expiresIn: "7d" }
        );

        const newHash = crypto
            .createHash("sha256")
            .update(newRefreshToken)
            .digest("hex");

        await sessionModel.create({
            userId: decoded.id,
            refreshTokenHash: newHash,
            ip: req.ip,
            userAgent: req.headers["user-agent"]
        });

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        const accessToken = jwt.sign(
            { id: decoded.id },
            process.env.ACCESS_TOKEN,
            { expiresIn: "15m" }
        );

        return res.json({ accessToken });

    }
   
    catch (err) {
        return res.status(401).json({
            message: "Invalid refresh token"
        });
    }
    
    
}


export { register, login, logout, logoutAll, genrateRefresh }
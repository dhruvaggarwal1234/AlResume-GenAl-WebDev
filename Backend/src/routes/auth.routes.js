import { Router } from "express";
import { register, login, logout, logoutAll, genrateRefresh } from "../controllers/auth.controllers.js"

const authRouter = Router()


authRouter.post('/register',register)
authRouter.post("/login",login)

authRouter.post("/refresh",genrateRefresh)

authRouter.post("/logout",logout)
authRouter.post("/logoutAll",logoutAll)



export default authRouter

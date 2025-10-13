import { Router } from "express";
import { checkLogin, loginadmin, logOut, refreshToken, registeradmin } from "../Controllers/admin.controller.js";
import { setPrize } from "../Controllers/quiz.controller.js";
import { findUser } from "../Middlewares/auth.middleware.js";
import { mediaUpload } from "../Middlewares/multer.middleware.js";

const router = Router()

router.post('/register', registeradmin)
router.post('/login' , loginadmin)
router.get('/refreshToken', findUser, refreshToken)
router.get('/checkLogin', findUser, checkLogin)
router.get('/logout', findUser, logOut)
router.post('/setPrize', mediaUpload('prizes').single('image') , findUser, setPrize)

export default router
import { Router } from "express";
import { getQuestions } from "../Controllers/quiz.controller.js";

const router = Router()

router.get('/getQuestions', getQuestions)

export default router
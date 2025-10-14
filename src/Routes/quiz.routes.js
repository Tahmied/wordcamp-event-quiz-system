import { Router } from "express";
import { getPrize, getQuestions, submitAnswers } from "../Controllers/quiz.controller.js";

const router = Router()

router.post('/getQuestions', getQuestions)
router.post('/submitAnswers', submitAnswers)
router.get('/getPrize', getPrize)

export default router
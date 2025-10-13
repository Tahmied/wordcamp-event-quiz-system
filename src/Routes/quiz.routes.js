import { Router } from "express";
import { getQuestions, submitAnswers } from "../Controllers/quiz.controller.js";

const router = Router()

router.get('/getQuestions', getQuestions)
router.post('/submitAnswers', submitAnswers)

export default router
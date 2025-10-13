import Question from "../Models/question.model.js";
import { User } from "../Models/user.model.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { asyncHandler } from "../Utils/AsyncHandler.js";

export const getQuestions = asyncHandler(async (req, res) => {
    const { userToken } = req.body;

    if (!userToken) {
        throw new ApiError(400, 'User token is required.');
    }

    const user = await User.findOne({ userToken });

    user.quizState.attemptCount += 1;

    let easyQuestionsCount, hardQuestionsCount;
    if (user.quizState.attemptCount === 1) {
        easyQuestionsCount = 2;
        hardQuestionsCount = 1;
    } else {
        easyQuestionsCount = 1;
        hardQuestionsCount = 2;
    }

    const excludedIds = user.quizState.servedQuestions;

    const easyQuestions = await Question.aggregate([
        { $match: { difficulty: 'easy', _id: { $nin: excludedIds } } },
        { $sample: { size: easyQuestionsCount } }
    ]);

    const hardQuestions = await Question.aggregate([
        { $match: { difficulty: 'hard', _id: { $nin: excludedIds } } },
        { $sample: { size: hardQuestionsCount } }
    ]);

    const fetchedQuestions = [...easyQuestions, ...hardQuestions];

    if (fetchedQuestions.length < 3) {
        throw new ApiError(500, 'Not enough unique questions available.');
    }

    const fetchedQuestionIds = fetchedQuestions.map(q => q._id);
    user.quizState.servedQuestions.push(...fetchedQuestionIds);
    await user.save({ validateBeforeSave: false });

    const questionsForFrontend = fetchedQuestions.map(q => ({
        _id: q._id,
        text: q.text,
        options: q.options,
        difficulty: q.difficulty
    }));

    return res.status(200).json(
        new ApiResponse(200, questionsForFrontend, "Questions fetched successfully")
    );
});
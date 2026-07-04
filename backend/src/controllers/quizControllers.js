const quizModel = require('../models/Quiz');
const lectureModel = require('../models/Lecture');
const quizeValidator = require('../validators/quizeValidator');

async function createQuize(req, res) {
    const data = quizeValidator(req);
     const newQuiz = new quizModel({
        lecture: data.lecture,
        title: data.title,
        totalMarks: data.totalMarks,
        difficulty: data.difficulty,
        questions: data.questions
    });

    newQuizData = await newQuiz.save();

    const lectureData = await lectureModel.findById(data.lecture);

    if (!lectureData) {
        return res.status(401).send({success: false, message: "Lecture Not Found"});
    }
    lectureData.quizes.push(newQuizData._id);
    await lectureData.save();

    return res.send({success: true, message: "Quize Created Successfully"});

}

async function updateQuize(req, res) {
    const { quiz, title,totalMarks, difficulty, questions } = req.body;
    const quizData = await quizModel.findByIdAndUpdate(quiz,  {title, difficulty, totalMarks, questions});
    res.send({success:true, message: "Quiz Updated Successfully"});    
}

async function deleteQuize(req, res) {
    const {quiz} = req.body;
    const quizData = await quizModel.findById(quiz);
    const lectureId = quizData.lecture;
    await quizModel.findById(quiz);
    
    const lecture = await lectureModel.findById(lectureId);
    lecture.quizes = lecture.quizes.filter((id) => id.toString() != quiz);
    await lecture.save();

    return res.send({success:true, message: "Quiz Deleted Successfully"});
}

async function getQuize(req, res) {

}

module.exports = { createQuize, updateQuize, deleteQuize, getQuize };
const progressModel = require('../models/Progress');
const lectureModel = require('../models/Lecture');

async function markLectureComplete(req, res) {
    const {studentId, courseId, lectureId} = req.body;
    if (!studentId || !courseId || !lectureId) {
        return res.status(401).send({success: false, message: "Required Fields Not Found"});
    }
    const studentProgressData = await progressModel.findOne({student: studentId, course: courseId});
    if (!studentProgressData) {
        return res.status(400).send({success:true, message: "Progress Not Found"});
    }
    studentProgressData.completedLectures.push(lectureId);
    const lectureData = await lectureModel.findById(lectureId);
    const chapterId = lectureData.chapter;
    const totalLectures = await lectureModel.countDocuments({chapter: chapterId});
    const totalProgress = studentProgressData.completedLectures.length / totalLectures * 100;
    studentProgressData.overallProgress = totalProgress;
    const newProgressData = await studentProgressData.save();
    
    return res.send({success:true, message: "Lecture Marked Completed"});
}

async function markLectureInComplete(req, res) {
    const {studentId, courseId, lectureId} = req.body;
    const studentProgressData = await progressModel.findOne({student: studentId, course: courseId});
    studentProgressData.completedLectures = studentProgressData.completedLectures.filter((id)=> id.toString() != lectureId);
    
    const lectureData = await lectureModel.findById(lectureId);
    const chapterId = lectureData.chapter;
    const totalLectures = await lectureModel.countDocuments({chapter: chapterId});
    const totalProgress = studentProgressData.completedLectures.length / totalLectures * 100;
    studentProgressData.overallProgress = totalProgress;
    const newProgressData = await studentProgressData.save();
    return res.send({success:true, message: "Lecture Marked InCompleted"});
}


module.exports = {markLectureComplete, markLectureInComplete};
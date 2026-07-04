const enrollmentMode = require('../models/Enrollment');
const courseModel = require('../models/Course');
const progressModel = require('../models/Progress');

async function joinCourse(req, res) {
    const { studentId, courseId } = req.body;
    if( !studentId || !courseId ) {
        return res.status(400).send({success:false, message: "Required Not Found"});
    }

    const newEnrollment = new enrollmentMode({student: studentId, course: courseId, enrolledAt: Date.now()});  
    const newEnrollmentData = await newEnrollment.save();

    const course = await courseModel.findById(courseId);
    course.totalStudents++;
    await course.save();

    // when student enrolled in courses, It will create student progress card when they enrollment the courses.
    const progress = new progressModel({student: studentId, course :courseId, completeLectures:[], completedQuizzes:[], overallProgress: 0 });
    const newProgressData = await progress.save();

    return res.send({success: true, message: "Course Joined Successfully", data: newEnrollmentData});
}

module.exports = {joinCourse};
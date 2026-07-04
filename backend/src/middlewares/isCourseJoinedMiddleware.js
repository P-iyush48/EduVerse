const enrollmentModel = require('../models/Enrollment');
const lectureModel = require('../models/Lecture');
const moduleModel = require('../models/Module');

async function isCourseJoinedMiddleware(req, res) {
    const lectureId = req.params.lectureId;
    const user = req.user;

    const lecture = await lectureModel.findById(lectureId).populate('chapter');
    const module = await moduleModel.findById(lectureId.chapter.module);
    const courseId = module.course;
    const isJoined = await enrollmentModel.findOne({student: user._id, course: courseId});
    if(!isJoined) {
        return res.status(401).send({success: false, message: "Unauthorized access"});
    }
    
    next();
}

module.exports = isCourseJoinedMiddleware;
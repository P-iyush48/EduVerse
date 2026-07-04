const express = require("express");
const {
  createCourse,
  updateCourse,
  getAllCourse,
  getSingleCourse,
  deleteCourse,
  getTeacherCourse,
  getStudentJoinedCourses,
  isStudentJoined
} = require("../controllers/courseController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");
const teacherProtectedMiddleware = require("../middlewares/teacherProtectedMiddleware.js");
const upload = require('../utils/upload.js');
const asyncHandler = require("../handlers/asyncHandler.js");


const routes = express.Router();


routes.post("/create",
  asyncHandler(authMiddleware),
  asyncHandler(teacherProtectedMiddleware),
  upload.fields([{name: "thumbnail", maxCount: 1},{name: "trailerVideo", maxCount: 1}]),
  asyncHandler(createCourse),
);

routes.put("/update",
  asyncHandler(authMiddleware),
  asyncHandler(teacherProtectedMiddleware),
  upload.fields([{name:"thumbnail",maxCount:1},{name:"trailerVideo",maxCount:1}]),
  asyncHandler(updateCourse),
);

routes.get("/all", asyncHandler(getAllCourse));

routes.get("/:courseId", asyncHandler(getSingleCourse));

routes.delete("/:courseId",
  asyncHandler(authMiddleware),
  asyncHandler(teacherProtectedMiddleware),
  asyncHandler(deleteCourse),
);


routes.get('/teacher-courses/:teacherId', 
  asyncHandler(authMiddleware),
  asyncHandler(teacherProtectedMiddleware), 
  asyncHandler(getTeacherCourse)
);

routes.get('/studetn-join-courses/:studentId', asyncHandler(authMiddleware), asyncHandler(getStudentJoinedCourses))

routes.get('/is-student-joined/:courseId', asyncHandler(authMiddleware), asyncHandler(isStudentJoined))

module.exports = routes;

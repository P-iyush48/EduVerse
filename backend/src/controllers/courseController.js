const courseValidators = require("../validators/courseValidators");
const courseModel = require("../models/Course");
const Enrollment = require("../models/Enrollment");


// Create Course function :
async function createCourse(req, res) {
  // console.log(req.files);
  const courseData = courseValidators(req);

  const newCourse = new courseModel(courseData);
  const newCourseData = await newCourse.save();

  return res.send({
    success: true,
    message: "Course Created Successfully",
    courseDate: newCourseData,
  });
}


// Update Course function :
async function updateCourse(req, res) {
  // console.log(req.body);

  const courseId = req.body.courseId;   // doute
  const courseData = courseValidators(req);   // validates fresh course data
  const oldThumbnail = req.body.oldThumbnail;   // doute
  const oldTrailerVideo = req.body.oldTrailerVideo;   // doute

  const thumbnail = courseData.thumbnail || oldThumbnail; 
  const trailerVideo = courseData.trailerVideo || oldTrailerVideo;

  const isCourseExists = await courseModel.findById(courseId);
  if (!isCourseExists) {
    return res
      .status(404)
      .send({ success: false, message: "Course Not Found" });
  }

  const updatedCourseData = await courseModel.findByIdAndUpdate(courseId, {
    ...courseData,
    thumbnail,
    trailerVideo,
  }, {new: true});

  // console.log(updatedCourseData);
  res.send({
    success: true,
    message: "Course Updated Successfully",
    updatedCourseData,
  });
}


// Pagination:
// Get All Course function :
async function getAllCourse(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;  // (5 - 1) * 10 --> 4*10 --> 40 {it means skip 40 courses of 100 || ...}
  const category = req.query.category;
  const language = req.query.language; 
  const level = req.query.level;
  const search = req.query.search;  //search based on title
  let filter = {};

  if (category) {
    filter.category = {$in: category};
  }
  if (language) {
    filter.language = {$in: language};
  }
  if (level) {
    filter.level = {$in: level};
  }
  if (search) {
    filter.search = { $regex: search, $option: "i" }; //title
    //$regex : kiske based pe search karna hai  (search)
    //$option : "i" it remove the upperCase or lowerCase, it just filter a character
  }
  
  //filter: {category:'', language:'', level:'', search:''}

  const courses = await courseModel.find(filter).skip(skip).limit(limit);

  const totalCourse = await courseModel.countDocuments(filter); 
  // .countDocuments() : method count the number of filter Courses stored in db.

  return res.send({
    success: true,
    pagination: {
      total: totalCourse,
      page: page,
      totalPages: Math.ceil(totalCourse / limit), 
      hasNextPage: page * limit < totalCourse,
      hasPreviousPage: page > 1,
    },
    data: courses,
  });
}
// Math.ceil(5.2) = 6


// Get Single Course function :
async function getSingleCourse(req, res) {
  const courseId = req.params.courseId;  //courseId get from URL. ( /:courseId )
  const course = await courseModel.findById(courseId).populate("teacher");   // get course and its's teacher
  
  // console.log(course);
  return res.send({ success: true, message: "Success", data: course });
}


// Delete Course function :
async function deleteCourse(req, res) {
  const courseId = req.params.courseId;   //courseId come from it's URL address. ( /:courseId )
  const response = await courseModel.findByIdAndDelete(courseId);
  return res.send({
    success: true,
    message: "Course Delete Successfully",
    response,
  });
}


//
async function getTeacherCourse(req, res) {
  const teacherId = req.params.teacherId;
  const allTeacherCourses = await courseModel.find({teacher: teacherId});

  return res.send({success: true, message: "Success", data: allTeacherCourses});
}


async function  getStudentJoinedCourses(req, res)  {
  const {studentId} = req.body;
  const courses = await Enrollment.find({student:studentId}).populate('course');
  return res.send({success:true, message:"Success",data:courses});
}

async function isStudentJoined(req,res) {
  const courseId = req.params.courseId;
  const user = req.user;
  const isJoined = await Enrollment.findOne({student:user._id,course:courseId});

  return res.send({
    success: true, message: "Success",  data:isJoined
  })
}

module.exports = { createCourse, updateCourse, getAllCourse, getSingleCourse, deleteCourse, getTeacherCourse, getStudentJoinedCourses, isStudentJoined };
  // .find() : method to get all the courses based on FILTER (search,language,level,category).
  // .skip() : method use to skip the number of courses.
  // .limit() : method allowed to get a limited courses.
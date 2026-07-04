const express = require('express');
const authMiddleware = require("../middlewares/authMiddleware.js");
const teacherProtectedMiddleware = require("../middlewares/teacherProtectedMiddleware.js");
const asyncHandler = require("../handlers/asyncHandler.js");
const {joinCourse} = require('../controllers/enrollmentControllers.js');

const routes = express.Router();


routes.post('/join', asyncHandler(authMiddleware), asyncHandler(teacherProtectedMiddleware), asyncHandler(joinCourse));

module.exports = routes;
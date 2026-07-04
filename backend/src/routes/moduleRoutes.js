const express = require('express');
const { createModule, updateModule, deleteModule, getModules } = require('../controllers/moduleController');
const asyncHandler = require('../handlers/asyncHandler');   // trycatch
const authMiddleware = require('../middlewares/authMiddleware');    //middleware check user login or not based on cookies stored in browser.
const teacherProtectedMiddleware = require('../middlewares/teacherProtectedMiddleware');    //middleware check user role 

const router = express.Router();

// create Module :
router.post('/', asyncHandler(authMiddleware), asyncHandler(teacherProtectedMiddleware), asyncHandler(createModule)
);

// update Module :
router.put('/', asyncHandler(authMiddleware), asyncHandler(teacherProtectedMiddleware), asyncHandler(updateModule));

// delete Module :
router.delete('/', asyncHandler(authMiddleware), asyncHandler(teacherProtectedMiddleware), asyncHandler(deleteModule));

// read Module :
router.get('/:courseId', asyncHandler(authMiddleware), asyncHandler(teacherProtectedMiddleware), asyncHandler(getModules));


module.exports = router;
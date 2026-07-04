const express = require('express');
const asyncHandler = require('../handlers/asyncHandler');
const authMiddleware = require('../middlewares/authMiddleware');
const teacherProtectedMiddleware = require('../middlewares/teacherProtectedMiddleware');
const {createChapter, updateChapter, deleteChapter, getChapters} = require('../controllers/chapterController');

const router = express.Router();

// create Chapter : 
router.post('/', asyncHandler(authMiddleware), asyncHandler(teacherProtectedMiddleware), asyncHandler(createChapter));

// update Chapter :
router.put('/', asyncHandler(authMiddleware), asyncHandler(teacherProtectedMiddleware),  asyncHandler(updateChapter));

// delete Chapter :
router.delete('/', asyncHandler(authMiddleware), asyncHandler(teacherProtectedMiddleware),  asyncHandler(deleteChapter));

// get all chapter :
router.get('/:moduleId', asyncHandler(getChapters));


module.exports = router;
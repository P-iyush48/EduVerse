const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const errorMiddleware = require('../middlewares/errorMiddleware');
const isCourseJoinedMiddleware = require('../middlewares/isCourseJoinedMiddleware');
const asyncHandler = require('../handlers/asyncHandler');
const teacherProtectedMiddleware = require('../middlewares/teacherProtectedMiddleware');
const { createLecture, updateLecture, deleteLecture, getAllLecture, getSingleLecture, manageMaterials, streamVideo } = require('../controllers/lectureControllers');
const upload = require('../utils/upload');

const router = express.Router();

// create Lecture :
router.post('/', asyncHandler(authMiddleware), 
asyncHandler(teacherProtectedMiddleware), 
upload.fields([{name: 'thumbnail', maxCount: 1},{name: 'videoUrl', maxCount: 1}]),
asyncHandler(createLecture));


//* Material Route : 
    router.post('/materials', 
        asyncHandler(authMiddleware),
        asyncHandler(teacherProtectedMiddleware),
        upload.array('materials'),
        asyncHandler(manageMaterials)
    )


// update Lecture :
router.put('/', asyncHandler(authMiddleware), 
asyncHandler(teacherProtectedMiddleware),
upload.fields([{name: 'thumbnail', maxCount: 1},{name: 'videoUrl', maxCount: 1}]),
 asyncHandler(updateLecture));


// delete Lecture :
router.delete('/', asyncHandler(authMiddleware), asyncHandler(teacherProtectedMiddleware), asyncHandler(deleteLecture));


// get All Lecture :
router.get('/all/:chapterId', asyncHandler(authMiddleware), asyncHandler(getAllLecture));


// get Single Lecture :
router.get('/:lectureId', asyncHandler(authMiddleware), asyncHandler(getSingleLecture));


// Video Stream Lecture route :
router.get('/video/stream/:lectureId', asyncHandler(authMiddleware), asyncHandler(isCourseJoinedMiddleware), asyncHandler(streamVideo));

module.exports = router;
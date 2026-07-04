const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const teacherProtectedMiddleware = require('../middlewares/teacherProtectedMiddleware');
const asyncHandler = require('../handlers/asyncHandler');
const { createQuize, updateQuize, deleteQuize, getQuize } = require('../controllers/quizControllers');

const router = express.Router();

router.post('/create', asyncHandler(authMiddleware), asyncHandler(teacherProtectedMiddleware), asyncHandler(createQuize));

router.put('/update', asyncHandler(authMiddleware), asyncHandler(teacherProtectedMiddleware), asyncHandler(updateQuize));

router.delete('/delete', asyncHandler(authMiddleware), asyncHandler(teacherProtectedMiddleware), asyncHandler(deleteQuize));

// router.get('/get', asyncHandler(authMiddleware), asyncHandler(getQuize));


module.exports = router;
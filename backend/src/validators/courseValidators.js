function courseValidators(req) {
    // console.log(req.files);

    const teacher = req.user._id;
    const {title, description, category, level, language, requirements, learningOutcomes,} = req.body;
    let modules = [];
    let totalDuration = req.body?.totalDuration || 0;
    let totalLectures = req.body?.totalLectures || 0;
    let totalStudents = req.body?.totalStudents || 0;
    let thumbnail = req.files.thumbnail[0].filename;    
    let trailerVideo = req.files.trailerVideo[0].filename;
    // req.files help to get multiple uploaded file with details
    
    // if (!title || !description || !category || !level || !language || !teacher || !requirements || !learningOutcomes || !modules || !thumbnail || !trailerVideo || !totalDuration || !totalLectures || !totalStudents) {
    //    throw new Error ("Required Fields Not Found");
    // }
    
    return {
        title, description, category, level, language, teacher, requirements, learningOutcomes, modules, thumbnail, trailerVideo, totalDuration, totalLectures, totalStudents
    }

}

// req.file: if we take a " Single file " from client REQUEST and get that file using " req.file "
// req.files: we take more than one file in client request and when we get those files using " req.files[index] "


module.exports = courseValidators;

//* req.files(): we get uploaded files in this format.
//*    {
//*        thumbnail: [ { ... } ],
//*        trailerVideo: [ { ... } ]
//*    }


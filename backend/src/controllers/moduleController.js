const mongoose = require('mongoose');
const moduleModel = require('../models/Module');
const courseModel = require('../models/Course');

// Create Module function :
async function createModule(req, res) {
    const teacherId = req.user._id;     // get teacherId to authMiddlware ( req.user )
    const { title, course } = req.body;      // get --> course as a courseId and title from CLIENT REQUEST.
    
        if(!title || !teacherId || !course ) {
            return res.status(401).send({success: false, message:"Required Fields Not Found"});
        }
    
        const courseData = await courseModel.findById(course);  // find course details by its courseId.
        if(!courseData || courseData.teacher.toString() != teacherId ) {
            return res.status(400).send({success: false, message: "Course Not Found"});
        }

        const order = courseData.modules.length + 1;

        const newModule = new moduleModel({course, title, order, chapter:[]});
        const newModuleData = await newModule.save();

        courseData.modules.push(newModuleData._id);
        await courseData.save();

        return res.send({success: true, message: "Module Created Successfully", data: newModuleData});
    
}


// Update Module function :
async function updateModule(req, res) {
    const teacherId = req.user._id;
    const { title, moduleId } = req.body;

    const moduleData = await moduleModel.findById(moduleId).populate("course");    // get module and its connected course details using .populate() 
    if (!moduleId || moduleData?.course?.teacher?.toString() != teacherId) {
        return res.status(400).send({success:false, message:"Module Not Found"});
    }

    moduleData.title = title;
    const newModuleData = await moduleData.save();

    return res.send({success: true, message: "Success", data: newModuleData});
}


// Delete Module function : 
async function deleteModule(req, res) {
    const { moduleId } = req.body;
    const teacherId = req.user._id;
    const moduleData = await moduleModel.findById(moduleId).populate("course");
    if(!moduleId || moduleData?.course?.teacher?.toString() != teacherId) {
        return res.status(400).send({success:false, message: "Module Not Found"});
    }

    await moduleModel.findByIdAndDelete(moduleId);   // delete module

    const courseData = await courseModel.findById(moduleData.course._id);
    courseData.modules = courseModel.modules.filter((id) => id.toString() != moduleId);     // use filter method to get id's of course.modules and check those id's are not equal to moduleId they stored in course.modules . Remove that same id from course.modules 
    await courseData.save();

    await moduleModel.updateMany({      
        course: moduleData.course._id,  // select Course from4 module/course._id
        order: {$gt: moduleData.order}  
    },
    {
        order: {$inc: order - 1}    //! $dec: - 1
    });
    // .updateMany( {filter}, {update} ); 

    return res.send({success: true, message: "Module Deleted Successfully"});
}


// Get Module function :
async function getModules(req, res) {
    const courseId = req.params.courseId;
    const allModule = await moduleModel.find({course: courseId});

    return res.send({success: true, message:"Success", data: allModule});

}


module.exports = { createModule , updateModule, deleteModule, getModules };

//& [1, 2, 3, 4] --> [1, removed, 3, 4] --> in order store greater than the position of removed value(2). 
// then Order holds : 3 and 4

// $gt: greater than
// $inc: increment by 1
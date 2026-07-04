const mongoose = require('mongoose');
const moduleModel = require('../models/Module');
const chapterModel = require('../models/Chapter');

async function createChapter(req, res) {
    const {title, module} = req.body; // get --> module as a moduleId
    const lecture = req.body || [];
    const moduleData = await moduleModel.findById(module);

    if(!module || !title || !moduleData) {
        return res.status(400).send({sucess: false, message:"Required Fields Not Found"});
    }

    const order = moduleData.chapters.length + 1;

    const newChapter = new chapterModel({module, title, order, lecture});   // add chapter details
    const newChapterData = await newChapter.save();     // save chapter details in db.

    moduleData.chapters.push(newChapterData._id);    // here we add chapterId in MODULE chapter array
    await moduleData.save();

    return res.send({success: true, message:"Chapter Created Successfully", data: newChapterData});

}

async function updateChapter(req, res) {
    const { title, chapterId } = req.body;;

    if(!chapterId || !title ) { 
        return res.status(404).send({success:false, message: "Required Fields Not Found"});
    }

    const chapter = await chapterModel.findById(chapterId).populate('module');  // get chapter data and connected module in chapter we get whole details of that module prevent it's ID.
    if(!chapter) {
        return res.status(400).send({success: false, message: "Chapter Not Found"});
    }

    chapter.title = title;  // update chapter title
    const newChapterData = await chapter.save();    // save chapterData with new title 

    return res.send({success: true, message: "Success", data: newChapterData });

}

async function deleteChapter(req, res) {
    const { chapterId } = req.body;

    if(!chapterId) {
        return res.status(401).send({success: false, message: "Required Fields Not Found"});
    }

    const chapterData = await chapterModel.findById(chapterId).populate('module');
    if(!chapterData) {
        return res.status(400).send({success: false, message: "Chapter Not Found"});
    }

    const moduleData = await moduleModel.findById(chapterData.module._id);
    moduleData.chapters = await moduleData.chapters.filter((id) => { id.toString() != chapterId }); //! doute
    await moduleData.save();

    await chapterModel.findByIdAndDelete(chapterId);    // delete chapter by its id.

    await chapterModel.updateMany({
        module: chapterData.module._id,
        order: {$gt: chapterData.order}
    },
    {
        order: {$inc: - 1}
    });

    return res.send({success: "false", message: "Chapter Delete Successfully"});
    
}

// Get all the Chapter :
async function getChapters(req, res) {
    const moduleId = req.params.moduleId;

    const allChapter = await chapterModel.find({module: moduleId}).populate("lectures");
    
    return res.send({success: true, message: "Success", data: allChapter});

}

module.exports = {createChapter, updateChapter, deleteChapter, getChapters};

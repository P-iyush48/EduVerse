const lectureValidator = require("../validators/lectureValidators");
const chapterModel = require('../models/Chapter');
const lectureModel =require('../models/Lecture');

const path = require('path');
const fs = require('fs');

// Create Lecture function :
async function createLecture(req, res) {
    const data = lectureValidator(req);
    // console.log(data.chapter);
    const chapter = await chapterModel.findById(data.chapter);    

    const order = chapter.lectures.length + 1;
    data.order = order;     // add new key with value in data
    data.materials = [];

    const newLecture = new lectureModel(data);
    const newlectureData = await newLecture.save();

    chapter.lectures.push(newlectureData._id);
    await chapter.save();

    return res.send({success :true, message:"Lecture Created Successfully", data: newlectureData});

}

// Manage Materials function :
async function manageMaterials(req, res) {
    const oldMaterials = req.body.oldMaterials || [];
    const materialsData = req.body.materialsData || []; // IT works when user selected Material Data like (pdf, ...)
    const textMaterialsData = req.body.textMaterials || []; // it works when user selected textMaterial 
    const uploadedFiles = req.files;    
    const {lectureId} = req.body;

    for(let i= 0; i < materialsData; i++) {
        const material = materialsData[i];
        material.fileUrl = uploadedFiles[i].filename;   // fileUrl updated by its reference automatically in materialsData
    }
    console.log(req.body);
    

    const finalmaterials = [...oldMaterials, ...materialsData, ...textMaterialsData];
    
    const lecture = await lectureModel.findById(lectureId);
    if(!lecture) {
        return res.status(404).send({success: false, message: "Lecture Not Found"});
    }
    // console.log(lecture);
    
    lecture.materials = finalmaterials;
    const newlectureData = await lecture.save();

    return res.send({success: true, messgae: "Materials Uploaded Successfully", data: newlectureData});
}
// oldMaterials= [{title:"", type:"", fileUrl:""}];
// materialsData= [{title:"", type:""}];
// uploadedFile = [file1, file2, file3, ...];


// Update Lecture function :
async function updateLecture(req, res) {
    const data = lectureValidator(req,"edit");
    const lectureId = req.body.lectureId;
    const oldThumbnail = req.body.oldThumbnail;
    const oldViderUrl = req.body.oldViderUrl;

    data.thumbnail = oldThumbnail || data.thumbnail;
    data.videoUrl = oldViderUrl || data.videoUrl;

    const updatedLectureData = await lectureModel.findByIdAndUpdate(lectureId, {
        title: data.title,
        description: data.description,
        textContent: data.textContent,
        thumbnail: data.thumbnail,
        videoUrl: data.videoUrl,
        duration: data.duration
},{new: true} );

    return res.send({success: true, message: "Lecture Updated Successfully", data: updatedLectureData});
}


// Delete Lecture function :
async function deleteLecture(req, res) {
    const {lectureId} = req.body;
    const lecture = await lectureModel.find(lectureId);
    const chapterId = lecture.chapter;

    if(!lectureId) {
        return res.status(404).send({success: false, message: "Required Fields Not Found"});
    }

    if(!lecture) {
        return res.status(401).send({success: false, message: "Lecture Not Found"});
    }
    
    const chapter = await chapterModel.findById(chapterId);
    chapter.lectures = chapter.lectures.filter((id) => id.toString() != lectureId);
    await chapter.save();

    await lectureModel.findByIdAndDelete(lectureId);  // lecture deleted in this code of line

    await lectureModel.updateMany({
        chapter: chapterId,
        order: {$gt: lecture.order}
    },
    {
        order: {$inc: -1}
    });

    return res.send({success:  false, message: "Lecture Deleted Successfully"});
}


// Get All Lecture function :
async function getAllLecture(req, res) {
    const chapterId  = req.params.chapterId;
    const allLecture = await lectureModel.find({chapter: chapterId});
    return res.send({success: true, message: "Success", data: allLecture});
}


// Get Single Lecture function :
async function getSingleLecture(req, res) {
    const lectureId = req.params.lectureId;
    const lecture = await lectureModel.findById(lectureId).populate('quizes');
    return res.send({success: true, message: "Success", data: lecture});
}




//^ helper function to get number inside a string: 
function getNumber(text) {
    const ans = "";
    let valid = "0123456789";
    for(let char in text) {
        if(valid.includes(char)) {
            ans += char;
        }
    }
    return Number(ans);
}

async function streamVideo(req, res) {
    const lectureId = req.params.lectureId;
    const lecture = await lectureModel.findById(lectureId);

    if(!lecture) {
        return res.status(404).send({success: false, message: "Lecture Not Found"});
    }

    const videoUrl = lecture.videoUrl;  // get videoUrl
    const videoPath = path.join(__dirname,'../../uploads/courseUploads', videoUrl);    // this will holds the path where video stored
    const stat = fs.statSync(videoPath);    // fs.statSync() this function return all information of video
    const fileSize = stat.size; //take size from state.size

    const range = req.headers.range;    // range comes from request headers (range holds starting bytes value of a video).
    if(!range) {
        return res.status(401).send({success: false, message: "Range Is Required"});
    }

    const CHUNK_SIZE = 10 ** 6;  // 1 mb   
    const start = getNumber(range);
    const end = Math.min(start + CHUNK_SIZE, fileSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start} - ${end}`,
        "Accept-Range": `bytes`,
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    }
    res.writeHead(206, headers);
    // 206 status code is used when we send partial data.

    const stream = fs.createReadStream(videoPath, {start: start, end: end});
    stream.pipe(res);
}

module.exports = { createLecture, updateLecture, deleteLecture, getAllLecture, getSingleLecture, manageMaterials, streamVideo };
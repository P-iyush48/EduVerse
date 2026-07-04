function lectureValidator(req, mode="add") {
    let chapter;
    if(mode=="add") {
        chapter = req.body.chapter;
    }
    const { title, description, } = req.body;
    const duraction = req.body || "0" ;
    console.log(req.files);
    
    const videoUrl =  req.files?.videoUrl?.[0]?.filename; 
    const thumbnail = req.files?.thumbnail?.[0]?.filename;
    const quizes = req.body?.quizes || [];

    if(mode == "add" && !chapter) {
        throw new Error ('Required Fields Not Found');
        return;
    }

    if(!title || !description ) {
       throw new Error ('Required Fields Not Found');   // passing custom error message.
       return;
    }

    return {
        chapter, title, description, duraction, thumbnail, videoUrl, quizes
    } 

}



module.exports = lectureValidator;
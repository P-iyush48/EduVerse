function quizeValidator(req) {
    const { lecture, title, totalMarks } = req.body;
    const difficulty = req.body?.difficulty || "easy";
    const questions = [];

    if(!lecture || !title || !totalMarks ) {
        throw new Error("Required Fields Not Found");
        return;
    }

    return {
        title, lecture, difficulty, totalMarks, questions, explanation
    }
    
}

module.exports = quizeValidator;
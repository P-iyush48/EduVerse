function teacherProtectedMiddleware(req, res, next) {
    const user = req.user.role;
    // console.log(user);

    if(!["teacher","student"].includes(user)) {
        return res.send({success: false, message: "Unauthorised Access"});
    }

    next();

}

module.exports = teacherProtectedMiddleware;
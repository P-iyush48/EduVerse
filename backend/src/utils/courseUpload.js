const multer = require('multer');
const fs = require('fs');

const fileDestination = './uploads/';

if (!fs.existsSync(fileDestination)) {
    fs.mkdirSync(fileDestination);
}

const storage = multer.diskStorage({    // Storage Engine
    destination: (req, file, cb)=>{
        cb(null, fileDestination);
    },
    filename: (req, file, cb)=>{
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, uniqueSuffix);
    }
});

const upload_2 = multer({storage});

// module.exports = 
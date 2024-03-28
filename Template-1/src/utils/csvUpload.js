const fs = require("fs");
const multer = require("multer");
const uploadsDir = "./src/uploads";
const APIError = require('./APIError')

const csvStorage = multer.diskStorage({
    destination: function (req, file, cb) {

        if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
        cb(null, `${uploadsDir}`);
    },
    filename: function (req, file, cb) {
        fileExtension = file?.mimetype?.split("/")?.[1];
        cb(null,file?.originalname)
    }
   
});

const upload = multer({ 
  storage: csvStorage, 
  limits: { fileSize: 5000000 },  //the max file size (in bytes)
  fileFilter: (req, file, cb) => {
    if (file?.mimetype==="text/csv") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new APIError({ message: "Only CSV allowed!", status: 500}));
    }
  } });

exports.csvUpload=upload.single('file')




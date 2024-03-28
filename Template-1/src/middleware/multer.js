const multer =require("multer");
const fs =require("fs");
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        if(!fs.existsSync("./src/uploads")) fs.mkdirSync("./src/uploads")
        if(!fs.existsSync("./src/uploads/images")) fs.mkdirSync("./src/uploads/images")
        cb(null,"./src/uploads/images")
        
    },
    filename:function(req,file,cb){
      const fileExtension = file.mimetype.split("/").pop();
        if(!fileExtension == "png")
        return new Error("inValid file type")

        cb(null,+Date.now()+"."+fileExtension)

    }
})


const upload = multer({
    storage,
    limits:{
        fieldNameSize:300,
        sileSize:15728640 //15Mb
    }
})


exports.uploadSingle = upload.single("file");


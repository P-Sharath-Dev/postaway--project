import multer from "multer";
import path from "path";
import ApplicationError from "./error.middleware.js";

//configure multer storage
const storageCofig = multer.diskStorage({

    destination : function(req, file, cb){
        cb(null, path.join('src', 'public', 'uploads'));
    },

    filename : function (req, file, cb) {
        const fileName = new Date().toISOString().replace(/:/g, '_') + '-' + file.originalname;
        cb(null, fileName);  
                 
    },
});

//filtering to accept only image files
const fileFilter  = (req, file, cb) => {

    // Only allow certain file types (image/jpeg, image/png, image/gif)
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(new ApplicationError(400,'Invalid file type. Only JPEG, PNG, and GIF are allowed')); // Reject file
  }

};

const fileUpload = multer({

    storage: storageCofig,
    fileFilter  : fileFilter ,
    limits : {
        fileSize : 1024 *1024 * 5, // upto 3 mb
    }
    
 });

export default fileUpload;
import multer from "multer";

// middelwear function for saving the image in database
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "../../uploads"); //giving the path where to save image
  },
  filename: function (_req, file, cb) {
    //genrating unique name of images
    const uniqueImgName = Date.now() + "-" + file.originalname;
    cb(null, uniqueImgName);
  },
});

const upload = multer({ storage: storage }); // defining where to store images

export default upload
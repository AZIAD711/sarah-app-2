import multer from "multer";
import fs from "fs";
import path from "path";

export const validateFiles = {
    image: ["image/png", "image/jpg", "image/jpeg"],
    video: ["video/mp4", "video/mkv", "video/avi"]
};

export const localFileStorage = ({
    folder ,
    type =[]
}) => {

    const uploadPath = path.join("uploads", folder);

    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            const uniqueName = `${Date.now()}-${file.originalname}`;
            cb(null, uniqueName);
        }
    });

    const fileFilter = (req, file, cb) => {
        if (!validateFiles[type]?.includes(file.mimetype)) {
            return cb(new Error(`Only ${type} files are allowed.`), false);
        }

        cb(null, true);
    };

    return multer({
        storage,
        fileFilter
    });
};
import multer from "multer";
import path from "path";
import fs from "fs";

// Define absolute upload path
const uploadDir = path.join(process.cwd(), "upload/images");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // [CHANGED!] Use absolute path
    },
    filename: (req, file, cb) => {
        const originalname = file.originalname;
        const ext = path.extname(originalname);
        const basename = path.basename(originalname, ext);

        let newFilename = originalname;
        let counter = 1;
        while (fs.existsSync(path.join(uploadDir, newFilename))) {
            newFilename = `${basename}(Copy_${counter})${ext}`;
            counter++;
        }
        cb(null, newFilename);
    }
});

export const upload = multer({ storage });

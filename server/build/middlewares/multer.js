import multer from "multer";
const storage = multer.diskStorage({
    destination: (_, __, callback) => {
        callback(null, 'build/uploads');
    },
    filename(_, file, callback) {
        callback(null, `${new Date().toISOString()}-${file.originalname}`);
    },
});
const fileFilter = (req, file, cb) => {
    const types = ['image/png', 'image/jpg', 'image/jpeg'];
    if (types.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
export default multer({ storage, fileFilter });
//# sourceMappingURL=multer.js.map
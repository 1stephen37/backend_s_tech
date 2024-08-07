// import multer from "multer";
//
// const storage = multer.diskStorage({
//     destination: function (req: Request, file, cb) {
//         cb(null, './public/images/uploads');
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         const fileExtension = getFileExtension(file.originalname); // Lấy phần mở rộng từ tên tệp gốc
//         const fileName = fileNameWithoutExtension(file.originalname);
//         cb(null, fileName + uniqueSuffix + fileExtension)
//     }
// });
//
// function getFileExtension(filename: string) {
//     return '.' + filename.split('.').pop();
// }
//
// const fileNameWithoutExtension = (fileName: string) => fileName.substring(0, fileName.lastIndexOf('.'));
//
// const upload = multer({storage: storage})
//
// export default upload;

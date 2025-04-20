import multer from "multer";
import fs from "fs";
import path from "path";

// đảm bảo nếu chưa có folder images sẽ sẽ tạo, còn không thì thôi
fs.mkdirSync("product/", { recursive: true });

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, "product/");
   },
   filename: function (req, file, cb) {
      const fileExtName = path.extname(file.originalname);

      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `local-${uniqueSuffix}${fileExtName}`);
   },
});

const productLocal = multer({ storage: storage, limits: { fileSize: 1 * 1024 * 1024 } }); // giới hạn file 1 MB

export default productLocal;

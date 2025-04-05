import express from "express";
import demoController from "../controller/demo.controller";

const demoRouter = express.Router();

demoRouter.get(`/`, demoController.helloWord);
demoRouter.get(`/check-server`, demoController.checkServer);

// Nhận dữ liệu từ Query
// Thường sử dụng: phân trang, lọc, search
demoRouter.get(`/query`, demoController.query);

// Nhận dữ liệu từ Params
// Thường dùng khi: muốn thao tác (sửa, xoá) vào một dữ liệu cụ thể (record, hàng)
demoRouter.put(`/param/:id`, demoController.param);

// Nhận dữ liệu từ headers
// Thường dùng với token, key, api-key
demoRouter.delete(`/headers`, demoController.headers);

// Nhận dữ liệu ở body
// Thường dùng khi: tạo, hoặc dữ liệu lớn
demoRouter.post(`/body`, demoController.body);

// MYSQL2: để tương tác với databsse
demoRouter.get(`/mysql2`, demoController.mysql2);

demoRouter.get(`/sequelize`, demoController.sequelize);

demoRouter.get(`/prisma`, demoController.prisma);

demoRouter.get("/send-email", demoController.sendEmail);

demoRouter.get(
  `/middleware`,
  (req, res, next) => {
    console.log(`middleware 1`);
    const payload = `payload của m1`;
    req.payload = payload;
    next();
  },
  (req, res, next) => {
    console.log(`middleware 2: ${req.payload}`);
    // next(123);
    next();
  },
  (req, res, next) => {
    console.log(`middleware 3`);
    next();
  },
  // (err, req, res, next) => {
  //    console.log(err);
  // },
  demoController.middleware
);

export default demoRouter;

import express from "express";
import pool from "./src/common/mysql2/pool.mysql2.js";

const app = express();

app.use(express.json());

app.get(`/`, (request, response, next) => {
   response.json(`hello word`);
});

// tạo một api
// Phương thức get
// endpoint: query
// trả lại chữ: "đây là api demo nhận dữ liệu từ query"

// Nhận dữ liệu từ Query
// Thường sử dụng: phân trang, lọc, search
app.get(`/query`, (request, response, next) => {
   const { page, pageSize, timkiem } = request.query;
   console.log({ page, pageSize, timkiem });
   response.json(`đây là api demo nhận dữ liệu từ query`);
});

// Nhận dữ liệu từ Params
// Thường dùng khi: muốn thao tác (sửa, xoá) vào một dữ liệu cụ thể (record, hàng)
app.put(`/param/:id`, (req, res, next) => {
   console.log({ params: req.params });
   const { id } = req.params;
   res.json(`đây là api demo nhận dữ liệu từ param`);
});

// Nhận dữ liệu từ headers
// Thường dùng với token, key, api-key
app.delete(`/headers`, (req, res, next) => {
   console.log(req.headers.tokenCyberSoft);
   res.json(`đây là api demo nhận dữ liệu từ headers`);
});

// Nhận dữ liệu ở body
// Thường dùng khi: tạo, hoặc dữ liệu lớn
app.post(`/body`, (req, res, next) => {
   console.log(req.body);
   res.json(`Đây là api nhận dữ liệu từ body`);
});

// MYSQL2: để tương tác với databsse
app.get(`/mysql2`, async (req, res, next) => {
   const [rows, fields] = await pool.query("SELECT * FROM `Users`");

   console.log({ rows, fields });

   res.json(rows);
});

app.listen(3069, () => {
   console.log(`Server online at http://localhost:3069`);
});

import express from "express";
import pool from "./src/common/mysql2/pool.mysql2";
import sequelize, { models } from "./src/common/sequelize/connect.sequelize";
import { DataTypes } from "sequelize";
import rootRouter from "./src/routers/root.router";

const app = express();

app.use(express.json());

app.use(rootRouter)


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

// SEQUELIZE (ORM)
const Permissions = sequelize.define(
   "Permissions",
   {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      endpoint: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      method: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      module: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      deletedBy: {
         type: DataTypes.INTEGER,
         allowNull: false,
         defaultValue: 0,
      },
      isDeleted: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
         defaultValue: false,
      },
      deletedAt: {
         type: "TIMESTAMP",
         allowNull: true,
         defaultValue: null,
      },
      createdAt: {
         type: "TIMESTAMP",
         defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
         allowNull: false,
      },
      updatedAt: {
         type: "TIMESTAMP",
         defaultValue: sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
         allowNull: false,
      },
   },
   {
      tableName: "Permissions",
      timestamp: false,
   }
);
// CODE FIRST
// đồng bộ code => db
Permissions.sync({ alter: true });

// DATABASE FIRST
// đồng bộ từ db => code
// npx sequelize-auto -h localhost -d db_cyber_community -u root -x 1234 -p 3307  --dialect mysql -o src/models -a src/models/additional.json -l esm

app.get(`/sequelize`, async (req, res, next) => {
   // Sử dụng model Permission do mình tự tạo (CODE FIRST)
   const permissions = await Permissions.findAll({ raw: true });
   console.log({ permissions });

   // Sử dụng model do sequelize-auto tạo ra (DATABASE FIST)
   const users = await models.Users.findAll({ raw: true });

   res.json({ users, permissions });
});

app.listen(3069, () => {
   console.log(`Server online at http://localhost:3069`);
});

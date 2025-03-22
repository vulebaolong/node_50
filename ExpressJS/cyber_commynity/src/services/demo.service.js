import pool from "../common/mysql2/pool.mysql2";
import prisma from "../common/prisma/init.prisma";
import { models } from "../common/sequelize/connect.sequelize";
import Permissions from "../models/PermisionByMe";

const demoService = {
   query: () => {
      const { page, pageSize, timkiem } = request.query;
      console.log({ page, pageSize, timkiem });
      return `đây là api demo nhận dữ liệu từ query`;
   },
   helloWord: () => {
      return `Hello World!`;
   },
   checkServer: () => {
      return `Check server`;
   },
   param: (req, res, next) => {
      console.log({ params: req.params });
      const { id } = req.params;
      return `đây là api demo nhận dữ liệu từ param`;
   },
   headers: (req, res, next) => {
      console.log(req.headers.tokenCyberSoft);
      return `đây là api demo nhận dữ liệu từ headers`;
   },
   body: (req, res, next) => {
      console.log(req.body);
      return `Đây là api nhận dữ liệu từ body`;
   },
   mysql2: async (req, res, next) => {
      const [rows, fields] = await pool.query("SELECT * FROM `Users`");
      console.log({ rows, fields });

      return rows;
   },
   sequelize: async (req, res, next) => {
      // Sử dụng model Permission do mình tự tạo (CODE FIRST)
      const permissions = await Permissions.findAll({ raw: true });
      console.log({ permissions });

      // Sử dụng model do sequelize-auto tạo ra (DATABASE_URL FIST)
      const users = await models.Users.findAll({ raw: true });
      return { users, permissions };
   },
   prisma: async () => {
      const userList = await prisma.users.findMany();
      return userList;
   },
};

export default demoService;

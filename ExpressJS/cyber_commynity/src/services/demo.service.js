import { BadRequestException } from "../common/helpers/exception.helper";
import pool from "../common/mysql2/pool.mysql2";
import transporter from "../common/nodemailer/instance.nodemailer";
import prisma from "../common/prisma/init.prisma";
import { models } from "../common/sequelize/connect.sequelize";
import logger from "../common/winston/init.winston";
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

    throw new BadRequestException("sequelize");

    // Sử dụng model do sequelize-auto tạo ra (DATABASE_URL FIST)
    const users = await models.Users.findAll({ raw: true });
    return { users, permissions };
  },
  prisma: async (req) => {
    // LỖI KHÔNG KIỂM SOÁT ĐƯỢC
    // req.a.a

    // LỖI KIỂM SOÁT ĐƯỢC
    const passDB = 1234;
    const passUser = 1234;
    if (passDB !== passUser) {
      console.log(`trả lỗi`);
      logger.error("Mật khẩu không đúng");
      throw new BadRequestException("Mật khẩu không đúng");
    } else {
      logger.info(`Mật Khẩu Chính Xác`);
    }

    const userList = await prisma.users.findMany();
    return userList;
  },
  middleware: (req) => {
    req.a.a;
    return `middleware`;
  },
  sendEmail: async (data) => {
    // send mail with defined transport object
    const { from, to, subject, text, html } = data;

    //  const info = await transporter.sendMail({
    //    from: "phonghqm@gmail.com", // sender address
    //    to: "phonghqm@gmail.com", // list of receivers
    //    subject: "Hello ✔", // Subject line
    //    text: "Toi da tao mail thanh cong roi nha!", // plain text body
    //    html: "<b>Toi da tao mail thanh cong roi nha!</b>", // html body
    //  });

    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    return `send email`;
  },
};

export default demoService;

import { BadRequestException, UnAuthorizedException } from "../common/helpers/exception.helper";
import prisma from "../common/prisma/init.prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import tokenService from "./token.service";
import logger from "../common/winston/init.winston";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../common/constant/app.constant";

const authService = {
   register: async (req) => {
      const { fullName, email, password } = req.body;
      console.log({ fullName, email, password });

      const userExsit = await prisma.users.findUnique({
         where: {
            email: email,
         },
      });
      if (userExsit) throw new BadRequestException(`Tài khoản đã tồn tại, vui lòng đăng nhập`);
      console.log({ userExsit });

      const salt = bcrypt.genSaltSync(10); // tạo ra một chuỗi ngẫu nhiên để làm tăng phức tạp mã hoá ()
      console.log({ salt });
      const hashPassword = bcrypt.hashSync(password, salt);

      (token) => base64;
      // mã hoá chữ ký

      const userNew = await prisma.users.create({
         data: {
            fullName: fullName,
            email: email,
            password: hashPassword,
         },
      });

      delete userNew.password;

      return userNew;
   },
   login: async (req) => {
      const { email, password } = req.body;

      const userExsit = await prisma.users.findUnique({
         where: {
            email: email,
         },
      });
      if (!userExsit) throw new BadRequestException(`Tài khoản chưa tồn tại, vui lòng đăng ký ::1`);
      // if (!userExsit) throw new BadRequestException(`Tài khoản không hợp lệ ::1`);

      const isPassword = bcrypt.compareSync(password, userExsit.password);
      if (!isPassword) {
         // logic kiểm tra nếu đăng nhập quá 3 lần, lưu dấu vết hoặc cho vào blacklist để theo
         logger.error(`${userExsit.id} đăng nhập quá 3 lần, lưu dấu vết hoặc cho vào blacklist`);
         throw new BadRequestException(`Mật khẩu không chính xác ::2`);
      }
      // if (!isPassword) throw new BadRequestException(`Tài khoản không hợp lệ ::2`);

      const tokens = tokenService.createTokens(userExsit.id);

      return tokens;
   },
   refreshToken: async (req) => {
      const { accessToken, refreshToken } = req.body;
      if (!accessToken) throw new UnAuthorizedException(`Không có accessToken`);
      if (!refreshToken) throw new UnAuthorizedException(`Không có refreshToken`);

      const decodeRefreshToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
      const decodeAccessToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET, { ignoreExpiration: true });

      if (decodeRefreshToken.userId !== decodeAccessToken.userId) throw new UnAuthorizedException(`Token không hợp lệ`);

      const tokens = tokenService.createTokens(decodeRefreshToken.userId);

      return tokens;
   },
};

export default authService;

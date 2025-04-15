import { BadRequestException, UnAuthorizedException } from "../common/helpers/exception.helper";
import prisma from "../common/prisma/init.prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import tokenService from "./token.service";
import logger from "../common/winston/init.winston";
import { ACCESS_TOKEN_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REFRESH_TOKEN_SECRET } from "../common/constant/app.constant";
import { OAuth2Client } from "google-auth-library";

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
      console.log({ userNew });

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

      if (!userExsit?.password) throw new BadRequestException(`Vui lòng đăng nhập bằng google hoặc facebook, để cập nhật mật khẩu mới`);

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
   getInfo: async (req) => {
      delete req.user.password;
      return req.user;
   },
   googleLogin: async (req) => {
      const { code } = req.body;
      console.log({ code });

      const oAuth2Client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, "postmessage");

      const { tokens } = await oAuth2Client.getToken(code);
      // console.log({ abc });

      const googleDecode = jwt.decode(tokens.id_token);
      console.log({ googleDecode });

      // email_verified: có ý nghĩa là email của google có xác thực hay chưa
      // Nếu email_verified = false thì sao?
      // Có thể là:
      // Email được thêm qua ứng dụng bên thứ ba, chưa được xác thực.
      // Email là alias chưa xác minh.
      // Hoặc là lỗi hoặc cấu hình sai từ phía client.
      if (googleDecode.email_verified === false) throw new BadRequestException(`Email chưa hợp lệ`);

      let userExist = await prisma.users.findUnique({
         where: {
            email: googleDecode.email,
         },
      });

      // 1 - userExist có tồn tại: sẽ có id
      // 2 - userExist chưa có thì sẽ chạy vào if, tạo người dùng mới => có id
      if (!userExist) {
         userExist = await prisma.users.create({
            data: {
               email: googleDecode.email,
               fullName: googleDecode.name,
               avatar: googleDecode.picture,
               googleId: googleDecode.sub,
            },
         });
      }

      // nếu code chạy được xuống đây, thì userExist luôn tồn tại => có id

      const tokensSystem = tokenService.createTokens(userExist.id);

      return tokensSystem;
   },
};

export default authService;

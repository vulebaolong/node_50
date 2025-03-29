import { BadRequestException } from "../common/helpers/exception.helper";
import prisma from "../common/prisma/init.prisma";
import bcrypt from "bcrypt";

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

      token => base64
      // mã hoá chữ ký

      const userNew = await prisma.users.create({
         data: {
            fullName: fullName,
            email: email,
            password: hashPassword,
         },
      });

      delete userNew.password

      return userNew;
   },
};

export default authService;

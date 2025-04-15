import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";
import authService from "../../services/auth.service";
import prisma from "../prisma/init.prisma";

describe("Register", () => {
   beforeEach(() => {
      console.log("beforeEach");

      // đăng ký gián điệp, không kích hoạt chạy thật, nhưng logic của hàm vẫn sẽ chạy theo logic của register
      jest.spyOn(prisma.users, "create");
      jest.spyOn(prisma.users, "findUnique");
   });
   afterEach(() => {
      console.log("afterEach");
   });

   it("Case 1: Tạo người dùng mới với thông tin hợp lệ", async () => {
      console.log("Case 1: chạy");
      // mockResolvedValue(): áp dụng cho những hàm async / await
      // mockReturnValue(): áp dụng cho những hàm bình thường (không có async / await)

      // giả lập dữ liệu trả về cho 2 hàm findUnique và create
      await prisma.users.findUnique.mockResolvedValue(null);
      await prisma.users.create.mockResolvedValue({
         id: 23,
         email: "test@gmail.com",
         fullName: "Nguyễn Thị Test",
         avatar: null,
         password: "$2b$10$28m9/CvKbvYpTAE6FJfkU.m7L7Bv0wZ4LZVWE/9QcQ/XpHoQh8nH2",
         facebookId: null,
         googleId: null,
         roleId: 2,
         deletedBy: 0,
         isDeleted: false,
         deletedAt: null,
         createdAt: "2025-04-13T08:00:45.000Z",
         updatedAt: "2025-04-13T08:00:45.000Z",
      });

      // chạy thật hàm đăng ký
      const reuslt = await authService.register({
         body: {
            fullName: "Nguyễn Thị Test",
            email: "test@gmail.com",
            password: "1234",
         },
      });

      // kiểm tra dữ liệu đầu ra
      expect(reuslt).not.toHaveProperty("password"); // kiểm tra không được có password ở kết quả đầu ra
      expect(reuslt).toHaveProperty("email") // Kiểm tra có key email hay không?
      expect(typeof reuslt.email).toBe("string") // Kiểm tra kiểu dữ liệu của email
      expect(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reuslt.email)).toBe(true)
   });

   it("Case 2: Tạo người dùng mới với thông tin không hợp lệ", () => {
      console.log("Case 2: chạy");
   });
});

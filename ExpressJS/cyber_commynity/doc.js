// Cập nhật lại prisma khi thay đổi db
// npx prisma db pull: lỗi tất cả cấu trúc db (table, cột) đưa vào trong file prisma/schema.prisma
// npx prisma generate: cập nhật object dùng bên trong code, khi sử dụng prisma chấm



/**

Các thứ viện đã cài:

express

nodemon: reload lại server khi có sự thay đổi code (.env phải tắt server và mở lại)
extensionless: giúp import không cần phải thêm đuôi .js

mysql2: dùng để tương tác với db bằng câu lệnh SQL
sequelize: ORM giúp tương tác với db bằng các hàm đơn giản
sequelize-auto: chỉ có 1 chức năng duy nhất là vào DB lấy ra thông tin và tự tạo ra model

prisma: ORM giúp tương tác với db (giống với sequelize)

dotenv: thư viện giúp lấy biến trong file .env đưa vào dự án (process.env)

winston: ghi log vào file hoặc console(terminal)
chalk: thư viện tô màu cho chữ trong terminal
morgan: thư viện bắt tất cả các API gọi tới BE, dựa vào winston để có log đẹp dành cho API

cors: để fix lỗi CORS cho phép domain FE nào sử dụng

bcrypt: mã hoá password







*/

/**
 làm đẹp
 mac: shift + option + F
 win: shift + alt + F

 bỏ đi những import không sài
 mac: shift + option + O (chữ)
 win: shift + alt + O (chứ)

 thu gọn tất cả
 mac: cmd + K  + 0 (số)
 win: ctrl + K + 0 (số)

 mở tất
 mac: cmd + K  + J
 win: ctrl + K + J

 multiple cursor (đa con trỏ, chọn nhiều)
 mac: cmd + D
 win: ctrl + D







 */

/**    
      // 200: thành công
       // 400: thất bại
       // 404: tìm không thấy (not found)
       // 500: lỗi server (lỗi không kiểm soát được)
  */


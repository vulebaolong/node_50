
-- Kiểm tra version
SELECT VERSION();

-- database
CREATE DATABASE IF NOT EXISTS db_test; -- tạo database
DROP DATABASE db_test; -- xoá database
USE db_cyber_community;

-- table template
CREATE TABLE `TABLE_TEMPLATE` (
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT, -- mặc định luôn luôn có
	
	
	-- mặc định luôn luôn có
	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- table
-- PRIMARY KEY: kết hợp của NOT NULL và UNIQUE
CREATE TABLE `Roles` (
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT, -- mặc định luôn luôn có
	
	`name` VARCHAR(255),
	`description` VARCHAR(255),
	`isActive` BOOL DEFAULT 1,
	
	-- mặc định luôn luôn có
	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Đổi kiểu
ALTER TABLE `Roles`
MODIFY COLUMN `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT;

-- Thêm dữ liệu
INSERT INTO `Roles` (`name`, `description`) VALUES
('ROLE_ADMIN', 'Quản Trị Hệ Thống'),
('ROLE_USER', 'Người Dùng Hệ Thống')

DROP TABLE `Roles`; -- xoá table

CREATE TABLE `Users` (
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT, -- mặc định luôn luôn có
	
	`email` VARCHAR(255) NOT NULL UNIQUE,
	`fullName` VARCHAR(255),
	`avatar` VARCHAR(255),
	`password` VARCHAR(255),
	`facebookId` VARCHAR(255) UNIQUE,
	`googleId` VARCHAR(255) UNIQUE,
	`roleId` INT NOT NULL DEFAULT 2,
		
	FOREIGN KEY (`roleId`) REFERENCES `Roles` (`id`),
	
	-- mặc định luôn luôn có
	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


INSERT INTO `Users` (`email`, `fullName`, `password`) VALUES
('A@gmail.com', 'Nguyen Van A', '1234'),
('B@gmail.com', 'Nguyen Van B', '1234'),
('C@gmail.com', 'Nguyen Van C', '1234'),
('D@gmail.com', 'Nguyen Van D', '1234'),
('E@gmail.com', 'Nguyen Van E', '1234')

-- Query
SELECT * FROM `Users`;

SELECT `email` FROM `Users`;

SELECT `email` AS 'email người dùng' FROM `Users`;

CREATE TABLE `Foods` (
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT, -- mặc định luôn luôn có
	
	`foodName` VARCHAR(255),
	`description` VARCHAR(255),
	
	-- mặc định luôn luôn có
	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO `Foods` (`foodName`, `description`) VALUES
('gỏi kem', 'gỏi được làm từ kem'),
('gỏi gà', 'gỏi được làm từ gà'),
('gỏi vịt', 'gỏi được làm từ vịt'),
('gỏi cá', 'gỏi được làm từ cá'),
('gỏi heo', 'gỏi được làm từ heo')

CREATE TABLE `Orders` (
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT, -- mặc định luôn luôn có
	
	`userId` INT NOT NULL,
	`foodId` INT NOT NULL,
	
	FOREIGN KEY (`userId`) REFERENCES `Users` (`id`),
	FOREIGN KEY (`foodId`) REFERENCES `Foods` (`id`),
	
	-- mặc định luôn luôn có
	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO `Orders` (`userId`, `foodId`) VALUES
(1, 2),
(3, 1),
(2, 5),
(1, 3),
(3, 2)


SELECT * FROM `Orders`;

-- INNER JOIN
-- SELECT *
-- Users: 10 hàng
-- Orders: 12 hàng
-- SELECT `userId`, `foodId`, `email`, `fullName`, `password`
SELECT *
FROM `Orders`
INNER JOIN `Users` ON `Users`.id = `Orders`.userId;

-- LEFT JOIN
SELECT  `userId`, `foodId`, `email`, `fullName`, `password`
FROM `Users`
LEFT JOIN `Orders` ON `Users`.id = `Orders`.userId;

-- CROSS JOIN
SELECT  `userId`, `foodId`, `email`, `fullName`, `password`
FROM `Users`
CROSS JOIN `Orders`


-- Tìm 5 người đã like nhà hàng nhiều nhất (orders)
-- bước 1: lấy ra tất cả orders
SELECT * FROM `Orders`

-- bước 2: lấy thêm thông tin user (email)
SELECT `userId`, `foodId`, `email`
FROM `Orders`
INNER JOIN `Users` ON `Users`.id = `Orders`.userId

-- nhap:
SELECT `userId`, `foodId`, `email` AS 'Người dùng mua', `foodName` AS 'Món ăn là'
FROM `Orders`
INNER JOIN `Users` ON `Users`.id = `Orders`.userId
INNER JOIN `Foods` ON `Orders`.foodId = `Foods`.id


-- bước 3: nhóm các userId giống nhau
-- GROUP BY là nhóm những giá trị của cột giống nhau, bắt buộc các hàng phải giống nhau
SELECT `userId`, `email`
FROM `Orders`
INNER JOIN `Users` ON `Users`.id = `Orders`.userId
GROUP BY `userId`

-- bước 4: đếm số lượng đã được nhóm bằng COUNT
SELECT COUNT(`userId`) AS 'Số lần mua', `userId`, `email`
FROM `Orders`
INNER JOIN `Users` ON `Users`.id = `Orders`.userId
GROUP BY `userId`

-- Bước 5: sắp xếp giảm dần ORDER BY 
-- DESC: giảm dần, từ lớn tới thấp
-- ASC: tăng dần, từ thấp tới lớn
SELECT COUNT(`userId`) AS 'Số lần mua', `userId`, `email`
FROM `Orders`
INNER JOIN `Users` ON `Users`.id = `Orders`.userId
GROUP BY `userId`
ORDER BY `Số lần mua` DESC

-- Bước 6: Giới hạn LIMIT
SELECT COUNT(`userId`) AS 'Số lần mua', `userId`, `email`
FROM `Orders`
INNER JOIN `Users` ON `Users`.id = `Orders`.userId
GROUP BY `userId`
ORDER BY `Số lần mua` DESC
LIMIT 2



















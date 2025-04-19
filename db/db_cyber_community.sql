
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
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
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
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
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
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
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
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
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
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
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


CREATE TABLE `Articles` (
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT, -- mặc định luôn luôn có
	
	`title` VARCHAR(255),  
    `content` TEXT,   
	`imageUrl` VARCHAR(500),
	`views` INT NOT NULL DEFAULT 0,
	`userId` INT NOT NULL,
	
	-- mặc định luôn luôn có
	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO `Articles` (`content`, `imageUrl`, `views`, `userId`, `createdAt`, `updatedAt`)
VALUES
('Content about learning NextJS...', 'https://picsum.photos/seed/1/600/400', 15, 1, '2024-01-01 08:00:00', '2024-01-01 08:00:00'),
('Content about mastering React Query...', 'https://picsum.photos/seed/2/600/400', 32, 2, '2024-01-02 09:00:00', '2024-01-02 09:00:00'),
('Content about JavaScript tips...', 'https://picsum.photos/seed/3/600/400', 45, 1, '2024-01-03 10:00:00', '2024-01-03 10:00:00'),
('Comparison content...', 'https://picsum.photos/seed/4/600/400', 27, 3, '2024-01-04 11:00:00', '2024-01-04 11:00:00'),
('Content about TypeScript...', 'https://picsum.photos/seed/5/600/400', 12, 2, '2024-01-05 12:00:00', '2024-01-05 12:00:00'),
( 'Content about SQL joins...', 'https://picsum.photos/seed/6/600/400', 8, 3, '2024-01-06 13:00:00', '2024-01-06 13:00:00'),
('Extensions content...', 'https://picsum.photos/seed/7/600/400', 60, 1, '2024-01-07 14:00:00', '2024-01-07 14:00:00'),
('Content about React optimization...', 'https://picsum.photos/seed/8/600/400', 33, 2, '2024-01-08 15:00:00', '2024-01-08 15:00:00'),
( 'Content about API design...', 'https://picsum.photos/seed/9/600/400', 18, 3, '2024-01-09 16:00:00', '2024-01-09 16:00:00'),
('Predictions about web development...', 'https://picsum.photos/seed/10/600/400', 21, 1, '2024-01-10 17:00:00', '2024-01-10 17:00:00');

CREATE TABLE `RolePermission` (
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT, -- mặc định luôn luôn có
	
	`roleId` INT NOT NULL,
	`permissionId` INT NOT NULL,
	`isActive` BOOLEAN DEFAULT 1,
	
	FOREIGN KEY (`roleId`) REFERENCES Roles (`id`),
	FOREIGN KEY (`permissionId`) REFERENCES Permissions (`id`),
	
	-- mặc định luôn luôn có
	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `Chats` (
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT, -- mặc định luôn luôn có
	
	`message` TEXT,
	`userIdSender` INT,
	`userIdRecipient` INT,
	
	FOREIGN KEY (`userIdSender`) REFERENCES Users (`id`),
	FOREIGN KEY (`userIdRecipient`) REFERENCES Users (`id`),	
	
	-- mặc định luôn luôn có
	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);














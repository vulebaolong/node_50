-- -------------------------------------------------------------
-- TablePlus 6.4.4(604)
--
-- https://tableplus.com/
--
-- Database: db_init
-- Generation Time: 2025-05-04 17:11:39.5350
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `Articles`;
CREATE TABLE `Articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `imageUrl` varchar(500) DEFAULT NULL,
  `views` int NOT NULL DEFAULT '0',
  `userId` int NOT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Chats`;
CREATE TABLE `Chats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` text,
  `userIdSender` int DEFAULT NULL,
  `userIdRecipient` int DEFAULT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userIdSender` (`userIdSender`),
  KEY `userIdRecipient` (`userIdRecipient`),
  CONSTRAINT `Chats_ibfk_1` FOREIGN KEY (`userIdSender`) REFERENCES `Users` (`id`),
  CONSTRAINT `Chats_ibfk_2` FOREIGN KEY (`userIdRecipient`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Permissions`;
CREATE TABLE `Permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `endpoint` varchar(255) NOT NULL,
  `method` varchar(255) NOT NULL,
  `module` varchar(255) NOT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `RolePermission`;
CREATE TABLE `RolePermission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roleId` int NOT NULL,
  `permissionId` int NOT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `roleId` (`roleId`),
  KEY `permissionId` (`permissionId`),
  CONSTRAINT `RolePermission_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `Roles` (`id`),
  CONSTRAINT `RolePermission_ibfk_2` FOREIGN KEY (`permissionId`) REFERENCES `Permissions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Roles`;
CREATE TABLE `Roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `facebookId` varchar(255) DEFAULT NULL,
  `googleId` varchar(255) DEFAULT NULL,
  `roleId` int NOT NULL DEFAULT '2',
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `facebookId` (`facebookId`),
  UNIQUE KEY `googleId` (`googleId`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `Users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `Roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Articles` (`id`, `title`, `content`, `imageUrl`, `views`, `userId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'title 123', 'content123', 'https://picsum.photos/seed/1/600/400', 1, 1, 0, 0, NULL, '2024-01-01 08:00:00', '2025-04-27 08:18:13'),
(2, NULL, 'Content about mastering React Query...', 'https://picsum.photos/seed/2/600/400', 32, 2, 0, 0, NULL, '2024-01-02 09:00:00', '2024-01-02 09:00:00'),
(3, NULL, 'Content about JavaScript tips...', 'https://picsum.photos/seed/3/600/400', 45, 1, 0, 0, NULL, '2024-01-03 10:00:00', '2024-01-03 10:00:00'),
(4, NULL, 'Comparison content...', 'https://picsum.photos/seed/4/600/400', 27, 3, 0, 0, NULL, '2024-01-04 11:00:00', '2024-01-04 11:00:00'),
(5, NULL, 'Content about TypeScript...', 'https://picsum.photos/seed/5/600/400', 12, 2, 0, 0, NULL, '2024-01-05 12:00:00', '2024-01-05 12:00:00'),
(6, NULL, 'Content about SQL joins...', 'https://picsum.photos/seed/6/600/400', 8, 3, 0, 0, NULL, '2024-01-06 13:00:00', '2024-01-06 13:00:00'),
(7, NULL, 'Extensions content...', 'https://picsum.photos/seed/7/600/400', 60, 1, 0, 0, NULL, '2024-01-07 14:00:00', '2024-01-07 14:00:00'),
(8, NULL, 'Content about React optimization...', 'https://picsum.photos/seed/8/600/400', 33, 2, 0, 0, NULL, '2024-01-08 15:00:00', '2024-01-08 15:00:00'),
(9, NULL, 'Content about API design...', 'https://picsum.photos/seed/9/600/400', 18, 3, 0, 0, NULL, '2024-01-09 16:00:00', '2024-01-09 16:00:00'),
(10, NULL, 'Predictions about web development...', 'https://picsum.photos/seed/10/600/400', 21, 1, 0, 0, NULL, '2024-01-10 17:00:00', '2024-01-10 17:00:00'),
(23, 'title', 'content', 'iamge', 0, 15, 0, 0, NULL, '2025-04-20 08:57:54', '2025-04-20 08:57:54'),
(24, 'title', 'content', 'iamge', 0, 15, 0, 1, NULL, '2025-04-20 08:58:49', '2025-04-26 03:44:02'),
(25, 'titletitle', 'content', 'imageUrl', 0, 1, 0, 0, NULL, '2025-04-26 03:50:43', '2025-04-26 03:53:22'),
(26, 'title', 'content', 'imageUrl', 0, 1, 0, 0, NULL, '2025-04-26 03:51:05', '2025-04-26 03:51:05');

INSERT INTO `Chats` (`id`, `message`, `userIdSender`, `userIdRecipient`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'hello ', 19, 26, 0, 0, NULL, '2025-04-19 09:48:05', '2025-04-19 09:48:05'),
(2, 'sakjdkáhd', 26, 19, 0, 0, NULL, '2025-04-19 10:05:21', '2025-04-19 10:05:21'),
(3, 'akjsdkjahsd', 19, 26, 0, 0, NULL, '2025-04-19 10:05:25', '2025-04-19 10:05:25'),
(4, '1', 19, 26, 0, 0, NULL, '2025-04-19 10:05:27', '2025-04-19 10:05:27'),
(5, '1', 19, 26, 0, 0, NULL, '2025-04-19 10:05:27', '2025-04-19 10:05:27'),
(6, '2', 19, 26, 0, 0, NULL, '2025-04-19 10:05:27', '2025-04-19 10:05:27'),
(7, '23', 19, 26, 0, 0, NULL, '2025-04-19 10:05:29', '2025-04-19 10:05:29'),
(8, 'a', 26, 19, 0, 0, NULL, '2025-04-19 10:05:32', '2025-04-19 10:05:32'),
(9, 'a', 26, 19, 0, 0, NULL, '2025-04-19 10:05:32', '2025-04-19 10:05:32'),
(10, 'q', 26, 19, 0, 0, NULL, '2025-04-19 10:05:33', '2025-04-19 10:05:33'),
(11, 'q', 26, 19, 0, 0, NULL, '2025-04-19 10:05:33', '2025-04-19 10:05:33'),
(12, 'Nguyen Van E\n\n', 26, 5, 0, 0, NULL, '2025-04-19 10:05:52', '2025-04-19 10:05:52'),
(13, 'Nguyen Van E\n\n', 26, 5, 0, 0, NULL, '2025-04-19 10:05:52', '2025-04-19 10:05:52'),
(14, 'Nguyen Van E\n\n', 26, 5, 0, 0, NULL, '2025-04-19 10:05:53', '2025-04-19 10:05:53'),
(15, 'Nguyen Van E\n\n', 26, 5, 0, 0, NULL, '2025-04-19 10:05:53', '2025-04-19 10:05:53'),
(16, 'Nguyen Van E\n\n', 26, 5, 0, 0, NULL, '2025-04-19 10:05:53', '2025-04-19 10:05:53'),
(17, 'Nguyen Van E\n\n', 26, 5, 0, 0, NULL, '2025-04-19 10:05:53', '2025-04-19 10:05:53'),
(18, '123', 26, 5, 0, 0, NULL, '2025-04-19 10:05:55', '2025-04-19 10:05:55'),
(19, 'helllo', 26, 19, 0, 0, NULL, '2025-04-19 10:23:45', '2025-04-19 10:23:45'),
(20, 'kánkạhsd', 26, 19, 0, 0, NULL, '2025-04-19 10:24:31', '2025-04-19 10:24:31'),
(21, 'ađâsd', 26, 19, 0, 0, NULL, '2025-04-19 10:25:34', '2025-04-19 10:25:34'),
(22, '123', 26, 19, 0, 0, NULL, '2025-04-19 10:26:52', '2025-04-19 10:26:52'),
(23, '123', 26, 19, 0, 0, NULL, '2025-04-19 10:27:36', '2025-04-19 10:27:36'),
(24, 'llllo', 26, 19, 0, 0, NULL, '2025-04-19 10:33:13', '2025-04-19 10:33:13'),
(25, '123', 26, 19, 0, 0, NULL, '2025-04-19 10:33:45', '2025-04-19 10:33:45');

INSERT INTO `Permissions` (`id`, `name`, `endpoint`, `method`, `module`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'READ ARTICLE', '/article/', 'GET', 'Article', 0, 0, NULL, '2025-04-06 09:59:01', '2025-04-06 10:10:49'),
(2, 'CREATE ARTICLE', '/article/', 'POST', 'Article', 0, 0, NULL, '2025-04-12 09:42:36', '2025-04-12 09:42:36'),
(3, 'UPDATE ARTICLE', '/article/:id', 'PATCH', 'Article', 0, 0, NULL, '2025-04-12 09:43:39', '2025-04-12 09:43:39'),
(4, 'DELETE ARTICLE', '/article/:id', 'DELETE', 'Article', 0, 0, NULL, '2025-04-12 09:44:08', '2025-04-12 09:44:08'),
(5, 'READ USER', '/user/', 'GET', 'User', 0, 0, NULL, '2025-04-12 09:45:10', '2025-04-12 09:45:10');

INSERT INTO `RolePermission` (`id`, `roleId`, `permissionId`, `isActive`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 2, 1, 1, 0, 0, NULL, '2025-04-11 14:54:56', '2025-05-03 16:19:11'),
(4, 2, 2, 1, 0, 0, NULL, '2025-04-12 10:20:45', '2025-04-12 10:27:38');

INSERT INTO `Roles` (`id`, `name`, `description`, `isActive`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'ROLE_ADMIN', 'Quản Trị Hệ Thống', 1, 0, 0, NULL, '2025-03-16 07:29:45', '2025-03-16 07:29:45'),
(2, 'ROLE_USER', 'Người Dùng Hệ Thống', 1, 0, 0, NULL, '2025-03-16 07:29:45', '2025-04-11 14:56:16');

INSERT INTO `Users` (`id`, `email`, `fullName`, `avatar`, `password`, `facebookId`, `googleId`, `roleId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'A@gmail.com', 'Nguyen Van A', 'images/bhsiyr9lghtdqxvylwlb', '1234', NULL, NULL, 2, 0, 0, NULL, '2025-03-16 07:29:57', '2025-04-27 10:12:08'),
(2, 'B@gmail.com', 'Nguyen Van B', NULL, '1234', NULL, NULL, 2, 0, 0, NULL, '2025-03-16 07:29:57', '2025-03-16 07:29:57'),
(3, 'C@gmail.com', 'Nguyen Van C', NULL, '1234', NULL, NULL, 2, 0, 0, NULL, '2025-03-16 07:29:57', '2025-03-16 07:29:57'),
(4, 'D@gmail.com', 'Nguyen Van D', NULL, '1234', NULL, NULL, 2, 0, 0, NULL, '2025-03-16 07:29:57', '2025-03-16 07:29:57'),
(5, 'E@gmail.com', 'Nguyen Van E', NULL, '1234', NULL, NULL, 2, 0, 0, NULL, '2025-03-16 07:29:57', '2025-03-16 07:29:57'),
(12, 'long@gmail.com', 'long', NULL, '1234', NULL, NULL, 2, 0, 0, NULL, '2025-03-29 10:11:05', '2025-03-29 10:11:05'),
(13, 'long1@gmail.com', 'long', NULL, '$2b$10$DKsdNDXnnpuzlgSre64U7./wn/zownj1A977.72jf1gKEaxvhhGnC', NULL, NULL, 2, 0, 0, NULL, '2025-03-29 10:21:31', '2025-03-29 10:21:31'),
(14, 'long5@gmail.com', 'long', NULL, '$2b$10$5fPOTxWPlunk3KkdVSje6.ZKXquy0MEW2oYm/nimPgoGfj1EJJQH6', NULL, NULL, 2, 0, 0, NULL, '2025-03-29 10:24:20', '2025-03-29 10:24:20'),
(15, 'long6@gmail.com', 'long', 'images/ixe42hmxgegpewnomdfz', '$2b$10$EPTcmVt10qrlxgfnsnUnoeg5JLLv2r/72xqtlJVXkrvvF9lhBnxuC', NULL, NULL, 2, 0, 0, NULL, '2025-03-30 02:00:08', '2025-04-26 08:58:02'),
(19, 'vulebaolong@gmail.com', 'Bảo Long Vũ Lê', 'local-1745144003498-862290761.jpeg', NULL, NULL, '100424098984127389694', 1, 0, 0, NULL, '2025-04-06 09:07:57', '2025-04-20 10:13:23'),
(26, 'longbaolevu@gmail.com', 'longbaolevu', NULL, '$2b$10$VSV13taEID5/SXdaVBQs0.DkabjbLc/0Y/eJNXnrAEnw1KZzIuMSy', NULL, NULL, 2, 0, 0, NULL, '2025-04-19 09:33:39', '2025-04-19 09:33:39');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
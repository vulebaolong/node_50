-- -------------------------------------------------------------
-- TablePlus 6.4.2(600)
--
-- https://tableplus.com/
--
-- Database: db_cyber_community
-- Generation Time: 2025-04-06 17:35:04.9500
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Articles` (`id`, `title`, `content`, `imageUrl`, `views`, `userId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, NULL, 'Content about learning NextJS...', 'https://picsum.photos/seed/1/600/400', 15, 1, 0, 0, NULL, '2024-01-01 08:00:00', '2024-01-01 08:00:00'),
(2, NULL, 'Content about mastering React Query...', 'https://picsum.photos/seed/2/600/400', 32, 2, 0, 0, NULL, '2024-01-02 09:00:00', '2024-01-02 09:00:00'),
(3, NULL, 'Content about JavaScript tips...', 'https://picsum.photos/seed/3/600/400', 45, 1, 0, 0, NULL, '2024-01-03 10:00:00', '2024-01-03 10:00:00'),
(4, NULL, 'Comparison content...', 'https://picsum.photos/seed/4/600/400', 27, 3, 0, 0, NULL, '2024-01-04 11:00:00', '2024-01-04 11:00:00'),
(5, NULL, 'Content about TypeScript...', 'https://picsum.photos/seed/5/600/400', 12, 2, 0, 0, NULL, '2024-01-05 12:00:00', '2024-01-05 12:00:00'),
(6, NULL, 'Content about SQL joins...', 'https://picsum.photos/seed/6/600/400', 8, 3, 0, 0, NULL, '2024-01-06 13:00:00', '2024-01-06 13:00:00'),
(7, NULL, 'Extensions content...', 'https://picsum.photos/seed/7/600/400', 60, 1, 0, 0, NULL, '2024-01-07 14:00:00', '2024-01-07 14:00:00'),
(8, NULL, 'Content about React optimization...', 'https://picsum.photos/seed/8/600/400', 33, 2, 0, 0, NULL, '2024-01-08 15:00:00', '2024-01-08 15:00:00'),
(9, NULL, 'Content about API design...', 'https://picsum.photos/seed/9/600/400', 18, 3, 0, 0, NULL, '2024-01-09 16:00:00', '2024-01-09 16:00:00'),
(10, NULL, 'Predictions about web development...', 'https://picsum.photos/seed/10/600/400', 21, 1, 0, 0, NULL, '2024-01-10 17:00:00', '2024-01-10 17:00:00');

INSERT INTO `Permissions` (`id`, `name`, `endpoint`, `method`, `module`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'READ ARTICLE', '/article/', 'GET', 'Article', 0, 0, NULL, '2025-04-06 09:59:01', '2025-04-06 10:10:49');

INSERT INTO `Roles` (`id`, `name`, `description`, `isActive`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'ROLE_ADMIN', 'Quản Trị Hệ Thống', 1, 0, 0, NULL, '2025-03-16 07:29:45', '2025-03-16 07:29:45'),
(2, 'ROLE_USER', 'Người Dùng Hệ Thống', 1, 0, 0, NULL, '2025-03-16 07:29:45', '2025-03-16 07:29:45');

INSERT INTO `Users` (`id`, `email`, `fullName`, `avatar`, `password`, `facebookId`, `googleId`, `roleId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'A@gmail.com', 'Nguyen Van A', NULL, '1234', NULL, NULL, 2, 0, 0, NULL, '2025-03-16 07:29:57', '2025-03-16 07:29:57'),
(2, 'B@gmail.com', 'Nguyen Van B', NULL, '1234', NULL, NULL, 2, 0, 0, NULL, '2025-03-16 07:29:57', '2025-03-16 07:29:57'),
(3, 'C@gmail.com', 'Nguyen Van C', NULL, '1234', NULL, NULL, 2, 0, 0, NULL, '2025-03-16 07:29:57', '2025-03-16 07:29:57'),
(4, 'D@gmail.com', 'Nguyen Van D', NULL, '1234', NULL, NULL, 2, 0, 0, NULL, '2025-03-16 07:29:57', '2025-03-16 07:29:57'),
(5, 'E@gmail.com', 'Nguyen Van E', NULL, '1234', NULL, NULL, 2, 0, 0, NULL, '2025-03-16 07:29:57', '2025-03-16 07:29:57'),
(12, 'long@gmail.com', 'long', NULL, '1234', NULL, NULL, 2, 0, 0, NULL, '2025-03-29 10:11:05', '2025-03-29 10:11:05'),
(13, 'long1@gmail.com', 'long', NULL, '$2b$10$DKsdNDXnnpuzlgSre64U7./wn/zownj1A977.72jf1gKEaxvhhGnC', NULL, NULL, 2, 0, 0, NULL, '2025-03-29 10:21:31', '2025-03-29 10:21:31'),
(14, 'long5@gmail.com', 'long', NULL, '$2b$10$5fPOTxWPlunk3KkdVSje6.ZKXquy0MEW2oYm/nimPgoGfj1EJJQH6', NULL, NULL, 2, 0, 0, NULL, '2025-03-29 10:24:20', '2025-03-29 10:24:20'),
(15, 'long6@gmail.com', 'long', NULL, '$2b$10$EPTcmVt10qrlxgfnsnUnoeg5JLLv2r/72xqtlJVXkrvvF9lhBnxuC', NULL, NULL, 2, 0, 0, NULL, '2025-03-30 02:00:08', '2025-03-30 02:00:08'),
(19, 'vulebaolong@gmail.com', 'Bảo Long Vũ Lê', 'https://lh3.googleusercontent.com/a/ACg8ocLiLfe8ecJDfKQzl64hVXixgHaVkyntrUs4fPh6z02c-Pnpcuqc=s96-c', NULL, NULL, '100424098984127389694', 2, 0, 0, NULL, '2025-04-06 09:07:57', '2025-04-06 09:07:57');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
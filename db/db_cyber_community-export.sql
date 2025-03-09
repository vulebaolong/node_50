-- -------------------------------------------------------------
-- TablePlus 6.3.1(584)
--
-- https://tableplus.com/
--
-- Database: db_cyber_community
-- Generation Time: 2025-03-09 15:30:52.9510
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `Foods`;
CREATE TABLE `Foods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `foodName` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Orders`;
CREATE TABLE `Orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `foodId` int NOT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `foodId` (`foodId`),
  CONSTRAINT `Orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`),
  CONSTRAINT `Orders_ibfk_2` FOREIGN KEY (`foodId`) REFERENCES `Foods` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Roles`;
CREATE TABLE `Roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  `deletedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `facebookId` (`facebookId`),
  UNIQUE KEY `googleId` (`googleId`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `Users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `Roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Foods` (`id`, `foodName`, `description`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'gỏi kem', 'gỏi được làm từ kem', 0, 0, '2025-03-09 07:38:37', '2025-03-09 07:38:37', '2025-03-09 07:38:37'),
(2, 'gỏi gà', 'gỏi được làm từ gà', 0, 0, '2025-03-09 07:38:37', '2025-03-09 07:38:37', '2025-03-09 07:38:37'),
(3, 'gỏi vịt', 'gỏi được làm từ vịt', 0, 0, '2025-03-09 07:38:37', '2025-03-09 07:38:37', '2025-03-09 07:38:37'),
(4, 'gỏi cá', 'gỏi được làm từ cá', 0, 0, '2025-03-09 07:38:37', '2025-03-09 07:38:37', '2025-03-09 07:38:37'),
(5, 'gỏi heo', 'gỏi được làm từ heo', 0, 0, '2025-03-09 07:38:37', '2025-03-09 07:38:37', '2025-03-09 07:38:37');

INSERT INTO `Roles` (`id`, `name`, `description`, `isActive`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'ROLE_ADMIN', 'Quản Trị Hệ Thống', 1, 0, 0, '2025-03-08 09:48:25', '2025-03-08 09:48:25', '2025-03-08 09:51:41'),
(2, 'ROLE_USER', 'Người Dùng Hệ Thống', 1, 0, 0, '2025-03-08 09:48:25', '2025-03-08 09:48:25', '2025-03-08 09:51:41'),
(6, 'ROLE_USER-VIEW', 'Người Dùng XEM', 1, 0, 0, '2025-03-08 09:50:56', '2025-03-08 09:50:56', '2025-03-08 09:50:56');

INSERT INTO `Users` (`id`, `email`, `fullName`, `avatar`, `password`, `facebookId`, `googleId`, `roleId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'A@gmail.com', 'Nguyen Van A', NULL, '1234', NULL, NULL, 2, 0, 0, '2025-03-09 07:23:16', '2025-03-09 07:23:16', '2025-03-09 07:23:16'),
(2, 'B@gmail.com', 'Nguyen Van B', NULL, '1234', NULL, NULL, 2, 0, 0, '2025-03-09 07:23:16', '2025-03-09 07:23:16', '2025-03-09 07:23:16'),
(3, 'C@gmail.com', 'Nguyen Van C', NULL, '1234', NULL, NULL, 2, 0, 0, '2025-03-09 07:23:16', '2025-03-09 07:23:16', '2025-03-09 07:23:16'),
(4, 'D@gmail.com', 'Nguyen Van D', NULL, '1234', NULL, NULL, 2, 0, 0, '2025-03-09 07:23:16', '2025-03-09 07:23:16', '2025-03-09 07:23:16'),
(5, 'E@gmail.com', 'Nguyen Van E', NULL, '1234', NULL, NULL, 2, 0, 0, '2025-03-09 07:23:16', '2025-03-09 07:23:16', '2025-03-09 07:23:16');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
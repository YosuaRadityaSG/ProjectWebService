/*
SQLyog Community v13.3.0 (64 bit)
MySQL - 8.0.30 : Database - kai_express
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`kai_express` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `kai_express`;

/*Table structure for table `bookings` */

DROP TABLE IF EXISTS `bookings`;

CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `booking_code` varchar(10) NOT NULL,
  `user_id` int NOT NULL,
  `schedule_id` int NOT NULL,
  `total_price` decimal(15,2) NOT NULL,
  `status` enum('unpaid','paid','cancelled') DEFAULT 'unpaid',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `booking_code` (`booking_code`),
  KEY `user_id` (`user_id`),
  KEY `schedule_id` (`schedule_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`schedule_id`) REFERENCES `schedules` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `bookings` */

insert  into `bookings`(`id`,`booking_code`,`user_id`,`schedule_id`,`total_price`,`status`,`created_at`) values 
(1,'KAI99X88Y',2,1,1200000.00,'paid','2026-06-15 09:57:00'),
(2,'KAI11A22B',3,2,450000.00,'unpaid','2026-06-15 09:57:00');

/*Table structure for table `payments` */

DROP TABLE IF EXISTS `payments`;

CREATE TABLE `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `booking_id` int NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `payment_proof_url` varchar(255) DEFAULT NULL,
  `status` enum('pending','success','failed') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `booking_id` (`booking_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `payments` */

insert  into `payments`(`id`,`booking_id`,`amount`,`payment_method`,`payment_proof_url`,`status`,`created_at`) values 
(1,1,1200000.00,'Bank Transfer - BCA','uploads/payments/bukti-budi.jpg','success','2026-06-15 09:57:00');

/*Table structure for table `schedules` */

DROP TABLE IF EXISTS `schedules`;

CREATE TABLE `schedules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `train_id` int NOT NULL,
  `origin_station_id` int NOT NULL,
  `destination_station_id` int NOT NULL,
  `departure_time` datetime NOT NULL,
  `arrival_time` datetime NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `train_id` (`train_id`),
  KEY `origin_station_id` (`origin_station_id`),
  KEY `destination_station_id` (`destination_station_id`),
  CONSTRAINT `schedules_ibfk_1` FOREIGN KEY (`train_id`) REFERENCES `trains` (`id`),
  CONSTRAINT `schedules_ibfk_2` FOREIGN KEY (`origin_station_id`) REFERENCES `stations` (`id`),
  CONSTRAINT `schedules_ibfk_3` FOREIGN KEY (`destination_station_id`) REFERENCES `stations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `schedules` */

insert  into `schedules`(`id`,`train_id`,`origin_station_id`,`destination_station_id`,`departure_time`,`arrival_time`,`price`) values 
(1,1,1,2,'2026-06-20 08:00:00','2026-06-20 16:30:00',600000.00),
(2,2,3,2,'2026-06-21 19:00:00','2026-06-22 05:30:00',450000.00);

/*Table structure for table `stations` */

DROP TABLE IF EXISTS `stations`;

CREATE TABLE `stations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `stations` */

insert  into `stations`(`id`,`code`,`name`,`city`,`created_at`) values 
(1,'GMR','Gambir','Jakarta','2026-06-15 09:57:00'),
(2,'SGU','Surabaya Gubeng','Surabaya','2026-06-15 09:57:00'),
(3,'BD','Bandung','Bandung','2026-06-15 09:57:00'),
(4,'SMC','Semarang Poncol','Semarang','2026-06-15 09:57:00');

/*Table structure for table `tickets` */

DROP TABLE IF EXISTS `tickets`;

CREATE TABLE `tickets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `booking_id` int NOT NULL,
  `passenger_name` varchar(100) NOT NULL,
  `identity_number` varchar(20) NOT NULL,
  `seat_number` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `booking_id` (`booking_id`),
  CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `tickets` */

insert  into `tickets`(`id`,`booking_id`,`passenger_name`,`identity_number`,`seat_number`) values 
(1,1,'Budi Santoso','3578012345670001','EKS-1-12A'),
(2,1,'Agus Santoso','3578012345670002','EKS-1-12B'),
(3,2,'Siti Aminah','3273012345670001','EKS-3-05C');

/*Table structure for table `trains` */

DROP TABLE IF EXISTS `trains`;

CREATE TABLE `trains` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `class` enum('Ekonomi','Bisnis','Eksekutif') NOT NULL,
  `capacity` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `trains` */

insert  into `trains`(`id`,`name`,`class`,`capacity`,`created_at`) values 
(1,'Argo Bromo Anggrek','Eksekutif',400,'2026-06-15 09:57:00'),
(2,'Turangga','Eksekutif',400,'2026-06-15 09:57:00'),
(3,'Pasundan','Ekonomi',600,'2026-06-15 09:57:00');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','customer') DEFAULT 'customer',
  `avatar_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`name`,`email`,`password`,`role`,`avatar_url`,`created_at`) values 
(1,'Admin KAI','admin@kai.id','$2b$10$dummyHashAdmin123','admin',NULL,'2026-06-15 09:57:00'),
(2,'Budi Santoso','budi@gmail.com','$2b$10$dummyHashBudi123','customer',NULL,'2026-06-15 09:57:00'),
(3,'Siti Aminah','siti@yahoo.com','$2b$10$dummyHashSiti123','customer',NULL,'2026-06-15 09:57:00');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

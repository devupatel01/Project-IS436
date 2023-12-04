-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ozama_kappa
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `appointment_date` date DEFAULT NULL,
  `appointment_time` time DEFAULT NULL,
  `details` text,
  `patient_id` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `appointment_for_patent_idx` (`patient_id`),
  KEY `appointment_created_by_receptionist_idx` (`created_by`),
  CONSTRAINT `appointment_created_by_receptionist` FOREIGN KEY (`created_by`) REFERENCES `receptionists` (`id`),
  CONSTRAINT `appointment_for_patent` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (4,'2023-12-08','03:30:00','sadasdasd',1,1,'2023-12-02 22:09:59',NULL),(5,'2023-12-08','03:30:00','sadasdasd',1,1,'2023-12-02 22:10:18',NULL),(6,'2023-12-08','03:30:00','sadasdasd',1,1,'2023-12-02 22:10:41',NULL),(7,'2023-12-08','03:30:00','sadasdasd',1,1,'2023-12-02 22:10:50',NULL),(8,'2023-12-08','03:45:00','For the trauma appointment',3,1,'2023-12-02 22:12:22',NULL),(9,'2023-12-06','03:45:00','for the surgery',2,1,'2023-12-02 22:12:38',NULL),(10,'2023-12-30','03:45:00','Teeth Surgery',2,1,'2023-12-02 22:13:32',NULL),(11,'2023-12-03','10:45:00','10:45 apt\r\n',1,1,'2023-12-03 05:10:20',NULL),(12,'2023-12-03','15:45:00','15:45 apt',1,1,'2023-12-03 05:10:50',NULL),(13,'2023-12-03','14:30:00','14:30',1,1,'2023-12-03 08:53:53',NULL),(14,'2023-12-03','15:30:00','',2,1,'2023-12-03 08:55:05',NULL),(15,'2023-12-03','20:30:00','20:30',1,1,'2023-12-03 10:44:03',NULL);
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `mobile_number` varchar(45) DEFAULT NULL,
  `symptoms` text,
  `details` text,
  `created_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `patient_created_by_idx` (`created_by`),
  CONSTRAINT `patient_created_by_receptionist` FOREIGN KEY (`created_by`) REFERENCES `receptionists` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patients`
--

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
INSERT INTO `patients` VALUES (1,'Ranjeet','Kapor','rkapor@gmail.com','12345678','12345678','12345678',1,'2023-12-02 20:45:39',NULL),(2,'Parth','Kapoor','pkapoor@gmail.com','252335566','2233556688','2233556688',1,'2023-12-02 20:46:20',NULL),(3,'Gd','Goenka','gddoenka@gmail.com','4455667788','4455667788','4455667788',1,'2023-12-02 21:21:02',NULL),(4,'Dev','Patel','devpatel@gmail.com','4455667878','None','Heart Patient',1,'2023-12-03 04:36:18',NULL),(5,'Parth','Modi','pmodi@gmail.com','8877887788','Pimples','pimples',1,'2023-12-03 10:43:40',NULL);
/*!40000 ALTER TABLE `patients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receptionists`
--

DROP TABLE IF EXISTS `receptionists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receptionists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `mobile` varchar(45) DEFAULT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` tinyint(1) DEFAULT '2' COMMENT '1=> admin\n2=> receptionst',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receptionists`
--

LOCK TABLES `receptionists` WRITE;
/*!40000 ALTER TABLE `receptionists` DISABLE KEYS */;
INSERT INTO `receptionists` VALUES (1,'admin','admin','admin@yopmail.com','1111111111','admin','827ccb0eea8a706c4c34a16891f84e7b',1,'2023-12-01 04:55:50','2023-12-02 15:19:47'),(2,'receptionst','receptionst','receptionst@yopmail.com','2222222222','receptionst','e10adc3949ba59abbe56e057f20f883e',2,'2023-12-02 13:00:45','2023-12-02 15:19:47');
/*!40000 ALTER TABLE `receptionists` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-03 16:21:28

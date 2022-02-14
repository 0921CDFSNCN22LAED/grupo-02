-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: mundosapien_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.22-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bonus`
--

DROP TABLE IF EXISTS `bonus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bonus` (
  `id` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bonus`
--

LOCK TABLES `bonus` WRITE;
/*!40000 ALTER TABLE `bonus` DISABLE KEYS */;
INSERT INTO `bonus` VALUES ('1c48812d-fa3b-478f-b364-1c14184ff58c',''),('233855f1-d527-494b-a48e-8dc359b298d4',''),('347b9f01-9299-47f4-9216-09534fbfcf36',''),('35af3a40-a240-44d1-b907-89a4aa5dc172',''),('4e801d09-6135-4e96-8c0d-a4e3c94b5c7d',''),('589d8d40-1a32-4c02-bdd2-447495c3950c',''),('6e0ebd10-0f6f-46b3-9176-792ada5f98ec',''),('c25a077d-70e8-455d-be27-bfed321da315',''),('d56267a7-19ed-4569-993c-85804bb09cd3','');
/*!40000 ALTER TABLE `bonus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `children`
--

DROP TABLE IF EXISTS `children`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `children` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '',
  `avatar` varchar(255) DEFAULT 'default-avatar.png',
  `user_id` varchar(255) NOT NULL,
  `parent_id` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `grade_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `parent_id` (`parent_id`),
  KEY `grade_id` (`grade_id`),
  CONSTRAINT `children_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `children_ibfk_2` FOREIGN KEY (`parent_id`) REFERENCES `parents` (`id`),
  CONSTRAINT `children_ibfk_3` FOREIGN KEY (`grade_id`) REFERENCES `grades` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `children`
--

LOCK TABLES `children` WRITE;
/*!40000 ALTER TABLE `children` DISABLE KEYS */;
INSERT INTO `children` VALUES ('17ceaf56-4e72-4af6-a328-5a3efcfcbe44','Pedro','default-avatar.png','11a714ac-9d03-4eed-bc27-442573a15166','780bfaa9-77ca-46e7-b96c-b4e11144bf64','2022-01-09 11:46:41','2022-01-09 11:46:41',7),('26e2fa7c-50b3-4b22-853a-42023d78a972','Lupe','avatar-1641153817580.png','e4f4ae09-8e5e-491c-933c-79c4cf0f52dc','647a45fb-81d9-4817-a469-553b830c674e','2022-01-09 18:37:29','2022-01-20 10:48:47',2),('4b8b544f-9a30-40a3-8dd1-87aa8d0fc17c','Anibal','default-avatar.png','49cec554-bfff-44b3-951b-5a4b5b07a69f','1c0e8356-4f3f-47a5-93f1-d60b35ac8f63','2022-01-09 11:46:41','2022-01-09 11:46:41',2),('98717d0c-e37b-4881-8061-bc732b0de6fa','Josefina','default-avatar.png','b4bae98a-2585-4c88-ba49-be5bdf5ddf78','780bfaa9-77ca-46e7-b96c-b4e11144bf64','2022-01-09 11:46:41','2022-01-09 11:46:41',4);
/*!40000 ALTER TABLE `children` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class_reviews`
--

DROP TABLE IF EXISTS `class_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `class_reviews` (
  `id` varchar(255) NOT NULL,
  `class_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `ranking` decimal(2,1) DEFAULT NULL,
  `review` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `class_id` (`class_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `class_reviews_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`),
  CONSTRAINT `class_reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_reviews`
--

LOCK TABLES `class_reviews` WRITE;
/*!40000 ALTER TABLE `class_reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `class_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `classes` (
  `id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `subject_id` int(10) unsigned NOT NULL,
  `grade_id` int(10) unsigned NOT NULL,
  `teacher_id` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `interactive_id` varchar(255) DEFAULT NULL,
  `description_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `subject_id` (`subject_id`),
  KEY `grade_id` (`grade_id`),
  KEY `teacher_id` (`teacher_id`),
  KEY `interactive_id` (`interactive_id`),
  KEY `description_id` (`description_id`),
  CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`),
  CONSTRAINT `classes_ibfk_2` FOREIGN KEY (`grade_id`) REFERENCES `grades` (`id`),
  CONSTRAINT `classes_ibfk_3` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`),
  CONSTRAINT `classes_ibfk_4` FOREIGN KEY (`interactive_id`) REFERENCES `interactives` (`id`),
  CONSTRAINT `classes_ibfk_5` FOREIGN KEY (`description_id`) REFERENCES `descriptions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES ('22e6b818-a2bc-40aa-b319-e48e032a4987','Numeración',7,5,'544aa1a4-73e9-421d-bf96-4f5762492e14',500,'5733db5e-5c17-4089-b14b-1e5fcc38eacf','9eeb6655-087a-4957-909a-cf250a85e130','2022-01-23 10:42:17','2022-01-23 10:42:17'),('60a54801-6d35-419b-a494-accc90e2f9b6','Sustantivos',8,4,'544aa1a4-73e9-421d-bf96-4f5762492e14',500,'1803c6e2-8114-49dd-871a-b7ac33e48949','d3357894-72b0-4b7b-b82e-1f76d905a6d5','2022-02-11 10:36:03','2022-02-11 10:36:03'),('7b262cb8-20d4-47a1-b770-7cc3c9aeba97','Fracciones V',7,5,'544aa1a4-73e9-421d-bf96-4f5762492e14',450,'9b35a51c-2203-4487-8592-38868df6b82a','aa43927c-5af8-40f0-bb57-f62e4555132e','0000-00-00 00:00:00','0000-00-00 00:00:00'),('8c45cb7b-6a5b-4c55-9cf1-89d9c1c69817','Fracciones II',7,5,'544aa1a4-73e9-421d-bf96-4f5762492e14',450,'f25ff3e0-f28b-4b0c-8620-ea5868cd5791','1280c1ed-9394-437b-bc7e-1f4f4bbf290a','0000-00-00 00:00:00','0000-00-00 00:00:00'),('984dd460-3013-49de-84af-42566f2cbc22','Fracciones IV',7,5,'544aa1a4-73e9-421d-bf96-4f5762492e14',450,'727337da-e1f5-49da-ae1c-5050cc5b2ab5','9e40d914-7451-4822-a71a-371d8cb8f90e','0000-00-00 00:00:00','0000-00-00 00:00:00'),('9dd3c12d-fd32-419e-8eab-7db74a5b92ed','Fracciones I',7,5,'544aa1a4-73e9-421d-bf96-4f5762492e14',450,'a1bde8d1-bd23-42ba-a331-c4e07b1e6500','6e9a4f5b-52ef-4dbf-b5cf-2990c5e4fc02','0000-00-00 00:00:00','0000-00-00 00:00:00'),('bc3bbbcf-bb24-4ad0-b11c-63888f8218e2','Fracciones III',7,5,'544aa1a4-73e9-421d-bf96-4f5762492e14',450,'4f92bdf4-841d-42c2-9c91-51af3c73a967','336ef1e4-234b-4da5-b0dd-ecfac151063f','0000-00-00 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classes_sales`
--

DROP TABLE IF EXISTS `classes_sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `classes_sales` (
  `id` varchar(255) NOT NULL,
  `class_id` varchar(255) NOT NULL,
  `sale_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `class_id` (`class_id`),
  KEY `sale_id` (`sale_id`),
  CONSTRAINT `classes_sales_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`),
  CONSTRAINT `classes_sales_ibfk_2` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes_sales`
--

LOCK TABLES `classes_sales` WRITE;
/*!40000 ALTER TABLE `classes_sales` DISABLE KEYS */;
INSERT INTO `classes_sales` VALUES ('1223b9de-d53a-4093-a461-052ebd963081','9dd3c12d-fd32-419e-8eab-7db74a5b92ed','57213eb5-7665-4448-8474-3ad723867d84'),('1fc68dc0-980e-4b69-b1eb-4ea313de7cc3','7b262cb8-20d4-47a1-b770-7cc3c9aeba97','a16e849b-8ab2-4f72-b98c-09f558422a0b'),('2b08fb2e-a0e8-496a-84ba-73507bb0c490','9dd3c12d-fd32-419e-8eab-7db74a5b92ed','13c76b1b-d80f-4173-88bf-86edf9cf4196'),('5ae5a249-95a3-4c2f-9514-3345383b4f63','984dd460-3013-49de-84af-42566f2cbc22','a16e849b-8ab2-4f72-b98c-09f558422a0b'),('83116300-9b7a-49da-bb12-52b95dadc6ad','8c45cb7b-6a5b-4c55-9cf1-89d9c1c69817','13c76b1b-d80f-4173-88bf-86edf9cf4196'),('a2af0c11-6a43-435e-a6b0-8a4a5da62602','9dd3c12d-fd32-419e-8eab-7db74a5b92ed','a16e849b-8ab2-4f72-b98c-09f558422a0b'),('c429a495-28b7-483c-801d-4a7dc947dbe7','bc3bbbcf-bb24-4ad0-b11c-63888f8218e2','e70299b8-ae28-4c3e-b2c3-8c1f074a88bc'),('ea5e6eae-1b54-42cd-9d79-5a15eb6d901d','8c45cb7b-6a5b-4c55-9cf1-89d9c1c69817','a16e849b-8ab2-4f72-b98c-09f558422a0b'),('f45ba955-2aac-4834-8833-5e5094145176','bc3bbbcf-bb24-4ad0-b11c-63888f8218e2','a16e849b-8ab2-4f72-b98c-09f558422a0b');
/*!40000 ALTER TABLE `classes_sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `descriptions`
--

DROP TABLE IF EXISTS `descriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `descriptions` (
  `id` varchar(255) NOT NULL,
  `description_short` text DEFAULT NULL,
  `description_long` text DEFAULT NULL,
  `contents` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `descriptions`
--

LOCK TABLES `descriptions` WRITE;
/*!40000 ALTER TABLE `descriptions` DISABLE KEYS */;
INSERT INTO `descriptions` VALUES ('1280c1ed-9394-437b-bc7e-1f4f4bbf290a','Intro a fracciones','Intro a fracciones','Denominador, Numerador'),('336ef1e4-234b-4da5-b0dd-ecfac151063f','Intro a fracciones','Intro a fracciones','Denominador, Numerador'),('6e9a4f5b-52ef-4dbf-b5cf-2990c5e4fc02','Intro a fracciones','','Denominador, Numerador'),('939401cf-9606-4604-95eb-a19de6c5f15b','Sustintivos y otras yerbas','','Sustantivos'),('9e40d914-7451-4822-a71a-371d8cb8f90e','Intro a fracciones','Intro a fracciones','Denominador, Numerador'),('9eeb6655-087a-4957-909a-cf250a85e130','Aprenderemos a  leer, escribir y comparar números naturales. Componer y descomponer números en forma aditiva y multiplicativa.','• Resolución de problemas que implican usar, leer, escribir y comparar números naturales.\r\n• Resolución de problemas que exigen componer y descomponer números en forma aditiva y multiplicativa.\r\n• Exploración de distintos sistemas de numeración: el egipcio y el chino.','Numeros naturales'),('aa43927c-5af8-40f0-bb57-f62e4555132e','Intro a fracciones','Intro a fracciones','Denominador, Numerador'),('b2a1d253-0c91-4ef2-964c-12ac01d8a6f5','Sobre sustantivos y otras yerbas','más y más','Sustantivos'),('d3357894-72b0-4b7b-b82e-1f76d905a6d5','Sustintivos y otras yerbas','','Sustantivos');
/*!40000 ALTER TABLE `descriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grades`
--

DROP TABLE IF EXISTS `grades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grades` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(7) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grades`
--

LOCK TABLES `grades` WRITE;
/*!40000 ALTER TABLE `grades` DISABLE KEYS */;
INSERT INTO `grades` VALUES (1,'1er año'),(2,'2do año'),(3,'3er año'),(4,'4to año'),(5,'5to año'),(6,'6to año'),(7,'7mo año');
/*!40000 ALTER TABLE `grades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interactives`
--

DROP TABLE IF EXISTS `interactives`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `interactives` (
  `id` varchar(255) NOT NULL,
  `video_id` varchar(255) DEFAULT NULL,
  `preview_id` varchar(255) DEFAULT NULL,
  `bonus_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `video_id` (`video_id`),
  KEY `preview_id` (`preview_id`),
  KEY `bonus_id` (`bonus_id`),
  CONSTRAINT `interactives_ibfk_1` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`),
  CONSTRAINT `interactives_ibfk_2` FOREIGN KEY (`preview_id`) REFERENCES `previews` (`id`),
  CONSTRAINT `interactives_ibfk_3` FOREIGN KEY (`bonus_id`) REFERENCES `bonus` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interactives`
--

LOCK TABLES `interactives` WRITE;
/*!40000 ALTER TABLE `interactives` DISABLE KEYS */;
INSERT INTO `interactives` VALUES ('1803c6e2-8114-49dd-871a-b7ac33e48949','71fd9047-53e6-4805-8c34-19d740640161','d4c92836-c221-4e3c-bbce-3ed1f34ff9c7','233855f1-d527-494b-a48e-8dc359b298d4'),('4f92bdf4-841d-42c2-9c91-51af3c73a967','9ab67f10-32ab-4ccc-8b76-e6427001c21b','8ad4aca2-894c-4e23-bb0a-2511f0674c39','c25a077d-70e8-455d-be27-bfed321da315'),('5733db5e-5c17-4089-b14b-1e5fcc38eacf','5e3cb264-aeed-4d9e-ab5d-a18d14c47527','ba7010cb-9b94-4bec-966c-adce3401c8ee','1c48812d-fa3b-478f-b364-1c14184ff58c'),('727337da-e1f5-49da-ae1c-5050cc5b2ab5','91af2118-9782-49e0-b7bb-dac7268eba25','218fb593-02c4-4a2c-b83a-cec265d527dd','d56267a7-19ed-4569-993c-85804bb09cd3'),('9b35a51c-2203-4487-8592-38868df6b82a','53e6ce0f-44bc-4c55-9c4a-87969b4102d4','d4728d88-741b-4b34-a287-3cdb94dcee2b','4e801d09-6135-4e96-8c0d-a4e3c94b5c7d'),('a1bde8d1-bd23-42ba-a331-c4e07b1e6500','ff9f4b59-f625-415f-a3db-54ea07f87132','1030189b-a46d-4e23-9ca4-954f38b211c3','35af3a40-a240-44d1-b907-89a4aa5dc172'),('f25ff3e0-f28b-4b0c-8620-ea5868cd5791','3fcca43d-7696-4bce-ae2e-aded9bfb4687','f0da1abd-ecb6-4bd5-9b34-cdcc0bf1845f','6e0ebd10-0f6f-46b3-9176-792ada5f98ec');
/*!40000 ALTER TABLE `interactives` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `page_comments`
--

DROP TABLE IF EXISTS `page_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `page_comments` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `comment` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `page_comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `page_comments`
--

LOCK TABLES `page_comments` WRITE;
/*!40000 ALTER TABLE `page_comments` DISABLE KEYS */;
INSERT INTO `page_comments` VALUES ('03b4194b-9739-46b5-8927-955e3f90493c','5820bf71-bf62-462d-90b7-233933ca7452','Muy linda la página, me gusta que cambien los fondos al pasar por el home'),('0785b8d3-dd04-425d-90c0-c96320af6d06','11a714ac-9d03-4eed-bc27-442573a15166','Va muy bien, a seguir trabajando!!! '),('3db9fda3-160f-4be1-a2f9-0e3578e51c1b','b4bae98a-2585-4c88-ba49-be5bdf5ddf78','Que lindo quedó el carousel vertical!\r\n'),('fd99b69b-40a5-4f17-8724-ab4056325d8d','49eedda1-7a06-4c08-9e44-abc0c531f216','Primero');
/*!40000 ALTER TABLE `page_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parents`
--

DROP TABLE IF EXISTS `parents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parents` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL,
  `pass` char(255) NOT NULL DEFAULT '',
  `avatar` varchar(255) DEFAULT 'default-avatar.png',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `parents_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parents`
--

LOCK TABLES `parents` WRITE;
/*!40000 ALTER TABLE `parents` DISABLE KEYS */;
INSERT INTO `parents` VALUES ('1c0e8356-4f3f-47a5-93f1-d60b35ac8f63','Jacob','jacob@mail.com','$2a$10$/9JmQhDmfSpQ2h5jvTb.OOt3LwdUzYtyj42ZxJTJmhHVpvQXg4Xl6','default-avatar.png','2022-01-09 11:46:41','2022-01-09 11:46:41','5820bf71-bf62-462d-90b7-233933ca7452'),('647a45fb-81d9-4817-a469-553b830c674e','Miguel','miguel@mail.com','$2a$10$7Kvq6pUCD3s7DQzUfpA6ROVLonC/9GOjDE8NT0Iwea7W6b7XEeOlS','avatar-1640609757605.png','2022-01-09 18:36:33','2022-01-20 10:48:13','49eedda1-7a06-4c08-9e44-abc0c531f216'),('780bfaa9-77ca-46e7-b96c-b4e11144bf64','Luios','luios@mail.com','$2a$10$/9JmQhDmfSpQ2h5jvTb.OOt3LwdUzYtyj42ZxJTJmhHVpvQXg4Xl6','avatar-1641152356809.png','2022-01-09 11:46:41','2022-01-09 11:46:41','17deb234-78d0-4de6-a0ff-683f14b94e35'),('905acc2a-3d1a-44c1-bd68-f821d57411d2','Juana','juana@mail.com','$2a$10$MwBwsCFW4Ms0bH6P8s5mAuRNSccdRxw7t9qFHEdiWcOyUPbhtioU2','default-avatar.png','2022-01-20 10:31:40','2022-01-20 10:31:40','00b17b3a-2a6d-41b4-bcd3-24f6d847c1ee'),('9892e270-34fd-43ef-b50a-407a2deaf387','Jose','jose@mail.com','$2a$10$9h5Kz3IR4iWSYLz2w6XEYeOkcGnaM0XsJBwczMr4OISqNh/PS.APS','default-avatar.png','2022-01-19 11:40:49','2022-01-19 11:40:49','254bce2b-7cb8-44d1-b58e-685432534e91'),('e2c0c7c5-98ba-4007-911a-24905bc092b9','Marcelo','marcelo@mail.com','$2a$10$VN6vHm34jI912LeUH3zrH.GbYXrzMaXJ9SuTim3.gyLxf/tj5ZimK','default-avatar.png','2022-01-21 11:39:56','2022-01-21 11:39:56','e194da24-6b71-4c96-a90d-13bc7db77c0d');
/*!40000 ALTER TABLE `parents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `previews`
--

DROP TABLE IF EXISTS `previews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `previews` (
  `id` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `previews`
--

LOCK TABLES `previews` WRITE;
/*!40000 ALTER TABLE `previews` DISABLE KEYS */;
INSERT INTO `previews` VALUES ('1030189b-a46d-4e23-9ca4-954f38b211c3','preview-1641153319554.png'),('218fb593-02c4-4a2c-b83a-cec265d527dd',NULL),('30ded12c-1e8e-4832-bae2-27572dd30b77','preview-1644575548242.jpg'),('8ad4aca2-894c-4e23-bb0a-2511f0674c39','preview-1641153726709.png'),('ba7010cb-9b94-4bec-966c-adce3401c8ee','preview-1642934536872.jpg'),('d2b7cfac-ca44-4b96-83c0-313e86fbda8b','preview-1644575648366.jpg'),('d4728d88-741b-4b34-a287-3cdb94dcee2b','preview-1641153726709.png'),('d4c92836-c221-4e3c-bbce-3ed1f34ff9c7','preview-1644575763497.jpg'),('f0da1abd-ecb6-4bd5-9b34-cdcc0bf1845f','preview-1641153738361.png');
/*!40000 ALTER TABLE `previews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `progress`
--

DROP TABLE IF EXISTS `progress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `progress` (
  `id` varchar(255) NOT NULL,
  `class_id` varchar(255) NOT NULL,
  `child_id` varchar(255) NOT NULL,
  `progress` tinyint(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `class_id` (`class_id`),
  KEY `child_id` (`child_id`),
  CONSTRAINT `progress_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`),
  CONSTRAINT `progress_ibfk_2` FOREIGN KEY (`child_id`) REFERENCES `children` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `progress`
--

LOCK TABLES `progress` WRITE;
/*!40000 ALTER TABLE `progress` DISABLE KEYS */;
/*!40000 ALTER TABLE `progress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sales` (
  `id` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `bought` tinyint(1) DEFAULT NULL,
  `user_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
INSERT INTO `sales` VALUES ('13c76b1b-d80f-4173-88bf-86edf9cf4196','2022-01-03 16:18:58','2022-01-03 16:19:32',1,'b4b44c03-226c-48e7-871f-fd33ff1fdb5c'),('39550fa9-8487-4569-be84-d87f5210fefe','2022-01-19 10:55:14','2022-01-19 10:55:14',NULL,'17deb234-78d0-4de6-a0ff-683f14b94e35'),('57213eb5-7665-4448-8474-3ad723867d84','2022-01-02 17:03:43','2022-01-02 17:03:50',1,'b47d2238-3563-42ff-9384-c906c8951831'),('a16e849b-8ab2-4f72-b98c-09f558422a0b','2022-01-05 12:09:00','2022-01-05 12:35:46',1,'b4b44c03-226c-48e7-871f-fd33ff1fdb5c'),('e70299b8-ae28-4c3e-b2c3-8c1f074a88bc','2022-01-03 08:34:34','2022-01-03 08:35:55',1,'b4b44c03-226c-48e7-871f-fd33ff1fdb5c');
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subjects` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES (1,'Música'),(2,'Plástica'),(3,'Teatro'),(4,'Conocimiento del mundo'),(5,'Educación Física'),(6,'Informática'),(7,'Matemática'),(8,'Prácticas del lenguaje'),(9,'Ciencias Naturales'),(10,'Ciencias Sociales'),(11,'Educación Tecnológica'),(12,'Formación Ética y Ciudadana');
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teachers`
--

DROP TABLE IF EXISTS `teachers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teachers` (
  `id` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `cv` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teachers`
--

LOCK TABLES `teachers` WRITE;
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;
INSERT INTO `teachers` VALUES ('544aa1a4-73e9-421d-bf96-4f5762492e14','Ramón','Castillo','rcastillo@mail.com',NULL);
/*!40000 ALTER TABLE `teachers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('00b17b3a-2a6d-41b4-bcd3-24f6d847c1ee'),('11a714ac-9d03-4eed-bc27-442573a15166'),('17deb234-78d0-4de6-a0ff-683f14b94e35'),('254bce2b-7cb8-44d1-b58e-685432534e91'),('49cec554-bfff-44b3-951b-5a4b5b07a69f'),('49eedda1-7a06-4c08-9e44-abc0c531f216'),('5820bf71-bf62-462d-90b7-233933ca7452'),('b4bae98a-2585-4c88-ba49-be5bdf5ddf78'),('e194da24-6b71-4c96-a90d-13bc7db77c0d'),('e4f4ae09-8e5e-491c-933c-79c4cf0f52dc');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `videos`
--

DROP TABLE IF EXISTS `videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `videos` (
  `id` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `len` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videos`
--

LOCK TABLES `videos` WRITE;
/*!40000 ALTER TABLE `videos` DISABLE KEYS */;
INSERT INTO `videos` VALUES ('',NULL,''),('3fcca43d-7696-4bce-ae2e-aded9bfb4687','',''),('53e6ce0f-44bc-4c55-9c4a-87969b4102d4','',''),('5e3cb264-aeed-4d9e-ab5d-a18d14c47527','',''),('71fd9047-53e6-4805-8c34-19d740640161','','0'),('91af2118-9782-49e0-b7bb-dac7268eba25','',''),('9ab67f10-32ab-4ccc-8b76-e6427001c21b','',''),('ff9f4b59-f625-415f-a3db-54ea07f87132','','');
/*!40000 ALTER TABLE `videos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'mundosapien_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-11 17:30:31

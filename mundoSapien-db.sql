-- MUNDO SAPIEN DB CREATION

DROP DATABASE IF EXISTS `mundoSapien_db`;
CREATE DATABASE `mundoSapien_db`;
USE `mundoSapien_db`;

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `Parents`;
CREATE TABLE `Parents` (
  	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  	`name` varchar(100) NOT NULL DEFAULT "",
  	`email` varchar(100) NOT NULL DEFAULT "",
  	`pass` char(60) NOT NULL DEFAULT "",
  	`avatar` varchar(200),
  	`user_id` int(10) unsigned NOT NULL,
  	PRIMARY KEY (`id`),
   	FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`)
 );

DROP TABLE IF EXISTS `Grades`;
CREATE TABLE `Grades` ( 
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`name` char(7) NOT NULL,
	PRIMARY KEY (`id`)
);

INSERT INTO `Grades` VALUES (DEFAULT, "1er a�o"), (DEFAULT, "2do a�o"),(DEFAULT, "3er a�o"),(DEFAULT, "4to a�o"),(DEFAULT, "5to a�o"),(DEFAULT, "6to a�o"),(DEFAULT, "7mo a�o");

DROP TABLE IF EXISTS `Children`;
CREATE TABLE `Children` ( 
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`user_id` int(10) unsigned NOT NULL,
	`parent_id` int(10) unsigned NOT NULL,
	`name` varchar(100) NOT NULL DEFAULT "",
	`avatar` varchar(200),
	`grade_id` int(10) unsigned NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`),
	FOREIGN KEY (`parent_id`) REFERENCES `Parents`(`id`),
	FOREIGN KEY (`grade_id`) REFERENCES `Grades`(`id`)
);

DROP TABLE IF EXISTS `Page_comments`;
CREATE TABLE `Page_comments` ( 
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`user_id` int(10) unsigned NOT NULL,
	`comment` varchar(500) NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`)
);

DROP TABLE IF EXISTS `Sales`;
CREATE TABLE `Sales` (
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`created_at` timestamp NULL DEFAULT NULL,
	`updated_at` timestamp NULL DEFAULT NULL, 
	`bought` tinyInt(1),
	PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `Sale_user`;
CREATE TABLE `Sale_user` ( 
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`user_id` int(10) unsigned NOT NULL,
	`sale_id` int(10) unsigned NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`),
	FOREIGN KEY (`sale_id`) REFERENCES `Sales`(`id`)
);

DROP TABLE IF EXISTS `Subjects`;
CREATE TABLE `Subjects` (
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`name` varchar(200) NOT NULL,
	PRIMARY KEY (`id`)	
);

INSERT
	INTO
	`Subjects` 
VALUES (DEFAULT,
"M�sica"),
(DEFAULT,
"Pl�stica"),
(DEFAULT,
"Teatro"),
(DEFAULT,
"Conocimiento del mundo"),
(DEFAULT,
"Educaci�n F�sica"),
(DEFAULT,
"Inform�tica"),
(DEFAULT,
"Matem�tica"),
(DEFAULT,
"Pr�cticas del lenguaje"),
(DEFAULT,
"Ciencias Naturales"),
(DEFAULT,
"Ciencias Sociales"),
(DEFAULT,
"Educaci�n Tecnol�gica"),
(DEFAULT,
"Formaci�n �tica y Ciudadana");

DROP TABLE IF EXISTS `Teachers`;
CREATE TABLE `Teachers` (
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`first_name` varchar(100) NOT NULL,
	`last_name` varchar(100) NOT NULL,
	`email` varchar(100) NOT NULL,
	`cv` text,	
	PRIMARY KEY (`id`)	
);

DROP TABLE IF EXISTS `Bonus`;
CREATE TABLE `Bonus` (
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`location` varchar(200) NOT NULL,
	PRIMARY KEY (`id`)	
);

DROP TABLE IF EXISTS `Previews`;
CREATE TABLE `Previews` (
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`location` varchar(200) NOT NULL,
	PRIMARY KEY (`id`)	
);

DROP TABLE IF EXISTS `Videos`;
CREATE TABLE `Videos` (
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`location` varchar(200) NOT NULL,
	`len` int(10) unsigned NOT NULL,
	PRIMARY KEY (`id`)	
);

DROP TABLE IF EXISTS `Interactives`;
CREATE TABLE `Interactives` (
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`video_id` int(10) unsigned NOT NULL,
	`preview_id` int(10) unsigned NOT NULL,
	`bonus_id` int(10) unsigned NOT NULL,	
	PRIMARY KEY (`id`),
	FOREIGN KEY (`video_id`) REFERENCES `Videos`(`id`),
	FOREIGN KEY (`preview_id`) REFERENCES `Previews`(`id`),
	FOREIGN KEY (`bonus_id`) REFERENCES `Bonus`(`id`)	
);

DROP TABLE IF EXISTS `Descriptions`;
CREATE TABLE `Descriptions` (
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`description_short` text,
	`description_long` text,
	`contents` text,
	PRIMARY KEY (`id`)	
);

DROP TABLE IF EXISTS `Classes`;
CREATE TABLE `Classes` (
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`title` varchar(200) NOT NULL,
	`subject_id` int(10) unsigned NOT NULL,
	`grade_id` int(10) unsigned NOT NULL,
	`teacher_id` int(10) unsigned NOT NULL,
	`price` double NOT NULL,
	`interactive_id` int(10) unsigned NOT NULL,
	`description_id` int(10) unsigned NOT NULL,
	PRIMARY KEY (`id`),	
	FOREIGN KEY (`subject_id`) REFERENCES `Subjects`(`id`),
	FOREIGN KEY (`grade_id`) REFERENCES `Grades`(`id`),
	FOREIGN KEY (`teacher_id`) REFERENCES `Teachers`(`id`),
	FOREIGN KEY (`interactive_id`) REFERENCES `Interactives`(`id`),
	FOREIGN KEY (`description_id`) REFERENCES `Descriptions`(`id`)
);

DROP TABLE IF EXISTS `Class_sale`;
CREATE TABLE `Classes_sales` (
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`class_id` int(10) unsigned NOT NULL,
	`sale_id` int(10) unsigned NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`class_id`) REFERENCES `Classes`(`id`),
	FOREIGN KEY (`sale_id`) REFERENCES `Sales`(`id`)
);

DROP TABLE IF EXISTS `Class_reviews`;
CREATE TABLE `Class_reviews` (
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`class_id` int(10) unsigned NOT NULL,
	`user_id` int(10) unsigned NOT NULL,
	`ranking` dec(2, 1), 
	`review` varchar(500),
	PRIMARY KEY (`id`),
	FOREIGN KEY (`class_id`) REFERENCES `Classes`(`id`),
	FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`)
);

DROP TABLE IF EXISTS `Progress`;
CREATE TABLE `Progress` (
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`class_id` int(10) unsigned NOT NULL,
	`child_id` int(10) unsigned NOT NULL,
	`progress` tinyInt(3) unsigned NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`class_id`) REFERENCES `Classes`(`id`),
	FOREIGN KEY (`child_id`) REFERENCES `Children`(`id`)
);










-- MUNDO SAPIEN DB CREATION

DROP DATABASE IF EXISTS `mundoSapien_db`;
CREATE DATABASE `mundoSapien_db`;
USE `mundoSapien_db`;

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
	`id` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `Parents`;
CREATE TABLE `Parents` (
  	`id` varchar(255) NOT NULL,
  	`name` varchar(255) NOT NULL DEFAULT "",
  	`email` varchar(255) NOT NULL UNIQUE,
  	`pass` char(255) NOT NULL DEFAULT "",
  	`avatar` varchar(255) DEFAULT "default-avatar.png",
  	`created_at` timestamp NULL DEFAULT NULL,
	`updated_at` timestamp NULL DEFAULT NULL, 
  	`user_id` varchar(255) NOT NULL,
  	PRIMARY KEY (`id`),
   	FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`)
 );

DROP TABLE IF EXISTS `Grades`;
CREATE TABLE `Grades` ( 
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`name` char(7) DEFAULT "1",
	PRIMARY KEY (`id`)
);

/*INSERT
	INTO
	`Grades`
VALUES (DEFAULT,
"1er año"),
(DEFAULT,
"2do año"),
(DEFAULT,
"3er año"),
(DEFAULT,
"4to año"),
(DEFAULT,
"5to año"),
(DEFAULT,
"6to año"),
(DEFAULT,
"7mo año");*/

DROP TABLE IF EXISTS `Children`;
CREATE TABLE `Children` ( 
	`id` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL DEFAULT "",
	`avatar` varchar(255) DEFAULT "default-avatar.png",
	`user_id` varchar(255) NOT NULL,
	`parent_id` varchar(255) NOT NULL,
	`created_at` timestamp NULL DEFAULT NULL,
	`updated_at` timestamp NULL DEFAULT NULL, 
	`grade_id` int(10) unsigned DEFAULT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`),
	FOREIGN KEY (`parent_id`) REFERENCES `Parents`(`id`),
	FOREIGN KEY (`grade_id`) REFERENCES `Grades`(`id`)
);

DROP TABLE IF EXISTS `Page_comments`;
CREATE TABLE `Page_comments` ( 
	`id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`comment` text NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`)
);

DROP TABLE IF EXISTS `Sales`;
CREATE TABLE `Sales` (
	`id` varchar(255) NOT NULL,
	`created_at` timestamp NULL DEFAULT NULL,
	`updated_at` timestamp NULL DEFAULT NULL, 
	`bought` tinyInt(1),
	`user_id` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS `Subjects`;
CREATE TABLE `Subjects` (
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)	
);

/*
INSERT
	INTO
	`Subjects` 
VALUES (DEFAULT,
"Música"),
(DEFAULT,
"Plástica"),
(DEFAULT,
"Teatro"),
(DEFAULT,
"Conocimiento del mundo"),
(DEFAULT,
"Educación Física"),
(DEFAULT,
"Informática"),
(DEFAULT,
"Matemática"),
(DEFAULT,
"Prácticas del lenguaje"),
(DEFAULT,
"Ciencias Naturales"),
(DEFAULT,
"Ciencias Sociales"),
(DEFAULT,
"Educación Tecnológica"),
(DEFAULT,
"Formación Ética y Ciudadana");
*/

DROP TABLE IF EXISTS `Teachers`;
CREATE TABLE `Teachers` (
	`id` varchar(255) NOT NULL,
	`first_name` varchar(255) NOT NULL,
	`last_name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`cv` text,	
	PRIMARY KEY (`id`)	
);

DROP TABLE IF EXISTS `Bonus`;
CREATE TABLE `Bonus` (
	`id` varchar(255) NOT NULL,
	`location` varchar(255),
	PRIMARY KEY (`id`)	
);

DROP TABLE IF EXISTS `Previews`;
CREATE TABLE `Previews` (
	`id` varchar(255) NOT NULL,
	`location` varchar(255),
	PRIMARY KEY (`id`)	
);

DROP TABLE IF EXISTS `Videos`;
CREATE TABLE `Videos` (
	`id` varchar(255) NOT NULL,
	`location` varchar(255),
	`len` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)	
);

DROP TABLE IF EXISTS `Interactives`;
CREATE TABLE `Interactives` (
	`id` varchar(255) NOT NULL,
	`video_id` varchar(255),
	`preview_id` varchar(255),
	`bonus_id` varchar(255),	
	PRIMARY KEY (`id`),
	FOREIGN KEY (`video_id`) REFERENCES `Videos`(`id`),
	FOREIGN KEY (`preview_id`) REFERENCES `Previews`(`id`),
	FOREIGN KEY (`bonus_id`) REFERENCES `Bonus`(`id`)	
);

DROP TABLE IF EXISTS `Descriptions`;
CREATE TABLE `Descriptions` (
	`id` varchar(255) NOT NULL,
	`description_short` text,
	`description_long` text,
	`contents` text,
	PRIMARY KEY (`id`)	
);

DROP TABLE IF EXISTS `Classes`;
CREATE TABLE `Classes` (
	`id` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`subject_id` int(10) unsigned NOT NULL,
	`grade_id` int(10) unsigned NOT NULL,
	`teacher_id` varchar(255) NOT NULL,
	`price` double NOT NULL,
	`interactive_id` varchar(255),
	`description_id` varchar(255),
	`created_at` timestamp NULL DEFAULT NULL,
	`updated_at` timestamp NULL DEFAULT NULL, 
	PRIMARY KEY (`id`),	
	FOREIGN KEY (`subject_id`) REFERENCES `Subjects`(`id`),
	FOREIGN KEY (`grade_id`) REFERENCES `Grades`(`id`),
	FOREIGN KEY (`teacher_id`) REFERENCES `Teachers`(`id`),
	FOREIGN KEY (`interactive_id`) REFERENCES `Interactives`(`id`),
	FOREIGN KEY (`description_id`) REFERENCES `Descriptions`(`id`)
);

DROP TABLE IF EXISTS `Classes_sales`;
CREATE TABLE `Classes_sales` (
	`id` varchar(255) NOT NULL ,
	`class_id` varchar(255) NOT NULL,
	`sale_id` varchar(255) NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`class_id`) REFERENCES `Classes`(`id`),
	FOREIGN KEY (`sale_id`) REFERENCES `Sales`(`id`)
);

DROP TABLE IF EXISTS `Class_reviews`;
CREATE TABLE `Class_reviews` (
	`id` varchar(255) NOT NULL,
	`class_id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`ranking` dec(2, 1), 
	`review` text,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`class_id`) REFERENCES `Classes`(`id`),
	FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`)
);

DROP TABLE IF EXISTS `Progress`;
CREATE TABLE `Progress` (
	`id` varchar(255) NOT NULL,
	`class_id` varchar(255) NOT NULL,
	`child_id` varchar(255) NOT NULL,
	`progress` tinyInt(3) NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`class_id`) REFERENCES `Classes`(`id`),
	FOREIGN KEY (`child_id`) REFERENCES `Children`(`id`)
);










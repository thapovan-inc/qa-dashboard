CREATE DATABASE IF NOT EXISTS `qa_dashboard` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `qa_dashboard`;

SET NAMES utf8;

DROP TABLE IF EXISTS `automation_env_master`;

CREATE TABLE `automation_env_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `env_name` varchar(45) NOT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `env_name_UNIQUE` (`env_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

set @nowUTC = CONVERT_TZ( NOW(), @@session.time_zone, '+00:00' );

INSERT INTO `automation_env_master`
(`env_name`,
`created_by`,
`created_at`,
`updated_at`)
VALUES
('DEV', 'Admin', @nowUTC, @nowUTC),
('QA', 'Admin', @nowUTC, @nowUTC),
('STAGING', 'Admin', @nowUTC, @nowUTC),
('PRODUCTION', 'Admin', @nowUTC, @nowUTC);


DROP TABLE IF EXISTS `automation_status_master`;

CREATE TABLE `automation_status_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(50) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `automation_status_master`
(`status`,
`created_by`,
`created_at`,
`updated_at`)
VALUES
('PASS', 'Admin', @nowUTC, @nowUTC),
('FAIL', 'Admin', @nowUTC, @nowUTC),
('ERROR', 'Admin', @nowUTC, @nowUTC),
('INPROGRESS', 'Admin', @nowUTC, @nowUTC);

DROP TABLE IF EXISTS `automation_types_master`;

CREATE TABLE `automation_types_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `type_UNIQUE` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Master table for autmation types';

INSERT INTO `automation_types_master`
(`type`,
`created_by`,
`created_at`,
`updated_at`)
VALUES
('FEATURE', 'Admin', @nowUTC, @nowUTC),
('SCENARIO', 'Admin', @nowUTC, @nowUTC),
('REGRESSION', 'Admin', @nowUTC, @nowUTC);

DROP TABLE IF EXISTS `automation_results`;

CREATE TABLE `automation_results` (
  `id` bigint(10) NOT NULL AUTO_INCREMENT,
  `types` int(11) NOT NULL,
  `env` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `sprint_name` varchar(50) DEFAULT NULL,
  `ticket_name` varchar(50) DEFAULT NULL,
  `description` varchar(150) NOT NULL,
  `report_url` varchar(1024) NOT NULL,
  `inserted_by` varchar(100) DEFAULT NULL COMMENT 'API key which inserts the data into the table',
  `inserted_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_types_idx` (`types`),
  KEY `fk_env_idx` (`env`),
  KEY `fk_status_idx` (`status`) /*!80000 INVISIBLE */,
  KEY `id_sprint_name` (`sprint_name`),
  CONSTRAINT `fk_env` FOREIGN KEY (`env`) REFERENCES `automation_env_master` (`id`),
  CONSTRAINT `fk_status` FOREIGN KEY (`status`) REFERENCES `automation_status_master` (`id`),
  CONSTRAINT `fk_types` FOREIGN KEY (`types`) REFERENCES `automation_types_master` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

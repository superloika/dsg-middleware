-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.33 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             12.5.0.6679
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table dsgpm_dev.br_config
CREATE TABLE IF NOT EXISTS `br_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bu` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `env` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'local',
  `api_un` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `api_pw` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `api_device` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `api_url_login` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `api_url_refresh` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `api_url_invoice_create` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `api_token` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cf_dsp_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cf_return_indicator` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cf_return_invoice_reference` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `api_un` (`api_un`),
  KEY `api_pw` (`api_pw`),
  KEY `api_device` (`api_device`),
  KEY `api_url_login` (`api_url_login`),
  KEY `api_url_refresh` (`api_url_refresh`),
  KEY `api_url_invoice_create` (`api_url_invoice_create`),
  KEY `api_token` (`api_token`),
  KEY `env` (`env`),
  KEY `cfid_dsp` (`cf_dsp_name`) USING BTREE,
  KEY `cf_return_indicator` (`cf_return_indicator`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='BeatRoute configs';

-- Data exporting was unselected.

-- Dumping structure for table dsgpm_dev.cm_lines
CREATE TABLE IF NOT EXISTS `cm_lines` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `uploaded_by` int(11) NOT NULL,
  `filename` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `group` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch_number` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_code` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `doc_no` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'CM #',
  `shipment_date` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uom` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(13,4) NOT NULL,
  `amount` decimal(13,4) NOT NULL,
  `qty_per_uom` int(11) NOT NULL,
  `uom_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount_percentage` decimal(13,1) NOT NULL DEFAULT '0.0',
  `invoice_doc_no` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `return_indicator` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT 'NA',
  `payment_term` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT 'NA',
  `remarks` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `status` (`status`) USING BTREE,
  KEY `created_at` (`created_at`) USING BTREE,
  KEY `updated_at` (`updated_at`) USING BTREE,
  KEY `terminal` (`group`) USING BTREE,
  KEY `batch_number` (`batch_number`) USING BTREE,
  KEY `uploaded_by` (`uploaded_by`) USING BTREE,
  KEY `filename` (`filename`) USING BTREE,
  KEY `customer_code` (`customer_code`) USING BTREE,
  KEY `doc_no` (`doc_no`) USING BTREE,
  KEY `item_code` (`item_code`) USING BTREE,
  KEY `item_description` (`item_description`) USING BTREE,
  KEY `uom` (`uom`) USING BTREE,
  KEY `quantity` (`quantity`) USING BTREE,
  KEY `price` (`price`) USING BTREE,
  KEY `amount` (`amount`) USING BTREE,
  KEY `qty_per_uom` (`qty_per_uom`) USING BTREE,
  KEY `uom_code` (`uom_code`) USING BTREE,
  KEY `posting_date` (`shipment_date`) USING BTREE,
  KEY `discount_percentage` (`discount_percentage`),
  KEY `invoice_doc_no` (`invoice_doc_no`),
  KEY `return_indicator` (`return_indicator`),
  KEY `payment_term` (`payment_term`)
) ENGINE=InnoDB AUTO_INCREMENT=395 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC COMMENT='Credit memos (Returns)';

-- Data exporting was unselected.

-- Dumping structure for table dsgpm_dev.devchat
CREATE TABLE IF NOT EXISTS `devchat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `message` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `channel` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `channel` (`channel`),
  FULLTEXT KEY `message` (`message`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table dsgpm_dev.failed_jobs
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table dsgpm_dev.general_customers
CREATE TABLE IF NOT EXISTS `general_customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `updated_at` datetime NOT NULL,
  `customer_code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_2` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_no` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `customer_code` (`customer_code`),
  KEY `name` (`name`),
  KEY `address` (`address`),
  KEY `address_2` (`address_2`),
  KEY `city` (`city`),
  KEY `contact` (`contact`),
  KEY `phone_no` (`phone_no`)
) ENGINE=InnoDB AUTO_INCREMENT=16894 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table dsgpm_dev.general_items
CREATE TABLE IF NOT EXISTS `general_items` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `item_code` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `vendor_code` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `u1` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `u2` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `u3` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `u4` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `item_code` (`item_code`) USING BTREE,
  KEY `description` (`description`) USING BTREE,
  KEY `created_at` (`created_at`),
  KEY `vendor_code` (`vendor_code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=229924 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table dsgpm_dev.groups
CREATE TABLE IF NOT EXISTS `groups` (
  `terminal_id` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group_code` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`terminal_id`) USING BTREE,
  KEY `terminal_name` (`group_name`) USING BTREE,
  KEY `terminal_code` (`group_code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table dsgpm_dev.invoices_headers
CREATE TABLE IF NOT EXISTS `invoices_headers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `doc_no` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `u1` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `u2` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipment_date` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `posting_date` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sm_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `doc_no` (`doc_no`),
  KEY `customer_code` (`customer_code`),
  KEY `customer_name` (`customer_name`),
  KEY `shipment_date` (`shipment_date`),
  KEY `posting_date` (`posting_date`),
  KEY `sm_code` (`sm_code`),
  KEY `u1` (`u1`),
  KEY `u2` (`u2`)
) ENGINE=InnoDB AUTO_INCREMENT=596276 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table dsgpm_dev.invoices_headers_20230315
CREATE TABLE IF NOT EXISTS `invoices_headers_20230315` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `doc_no` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `u1` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `u2` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipment_date` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `posting_date` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sm_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `doc_no` (`doc_no`) USING BTREE,
  KEY `customer_code` (`customer_code`) USING BTREE,
  KEY `customer_name` (`customer_name`) USING BTREE,
  KEY `shipment_date` (`shipment_date`) USING BTREE,
  KEY `posting_date` (`posting_date`) USING BTREE,
  KEY `sm_code` (`sm_code`) USING BTREE,
  KEY `u1` (`u1`) USING BTREE,
  KEY `u2` (`u2`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=864591 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table dsgpm_dev.invoices_headers_copy
CREATE TABLE IF NOT EXISTS `invoices_headers_copy` (
  `id` int(11) NOT NULL,
  `doc_no` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `u1` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `u2` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipment_date` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `posting_date` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sm_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dt_posting_date` date DEFAULT NULL,
  `dt_shipment_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table dsgpm_dev.invoices_lines
CREATE TABLE IF NOT EXISTS `invoices_lines` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `uploaded_by` int(11) NOT NULL,
  `filename` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `group` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch_number` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `vendor_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_code` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `doc_no` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipment_date` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uom` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(13,4) NOT NULL,
  `amount` decimal(13,4) NOT NULL,
  `qty_per_uom` int(11) NOT NULL,
  `uom_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount_percentage` decimal(13,1) NOT NULL DEFAULT '0.0',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `status` (`status`) USING BTREE,
  KEY `created_at` (`created_at`) USING BTREE,
  KEY `updated_at` (`updated_at`) USING BTREE,
  KEY `terminal` (`group`) USING BTREE,
  KEY `batch_number` (`batch_number`),
  KEY `uploaded_by` (`uploaded_by`),
  KEY `filename` (`filename`),
  KEY `vendor_code` (`vendor_code`),
  KEY `customer_code` (`customer_code`),
  KEY `doc_no` (`doc_no`),
  KEY `item_code` (`item_code`),
  KEY `item_description` (`item_description`),
  KEY `uom` (`uom`),
  KEY `quantity` (`quantity`),
  KEY `price` (`price`),
  KEY `amount` (`amount`),
  KEY `qty_per_uom` (`qty_per_uom`),
  KEY `uom_code` (`uom_code`),
  KEY `posting_date` (`shipment_date`) USING BTREE,
  KEY `discount_percentage` (`discount_percentage`)
) ENGINE=InnoDB AUTO_INCREMENT=936322 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table dsgpm_dev.invoices_lines_20230315
CREATE TABLE IF NOT EXISTS `invoices_lines_20230315` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `uploaded_by` int(11) NOT NULL,
  `filename` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `group` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch_number` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `vendor_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_code` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `doc_no` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipment_date` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uom` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(13,6) NOT NULL,
  `amount` decimal(13,6) NOT NULL,
  `qty_per_uom` int(11) NOT NULL,
  `uom_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `status` (`status`) USING BTREE,
  KEY `created_at` (`created_at`) USING BTREE,
  KEY `updated_at` (`updated_at`) USING BTREE,
  KEY `terminal` (`group`) USING BTREE,
  KEY `batch_number` (`batch_number`) USING BTREE,
  KEY `uploaded_by` (`uploaded_by`) USING BTREE,
  KEY `filename` (`filename`) USING BTREE,
  KEY `vendor_code` (`vendor_code`) USING BTREE,
  KEY `customer_code` (`customer_code`) USING BTREE,
  KEY `doc_no` (`doc_no`) USING BTREE,
  KEY `item_code` (`item_code`) USING BTREE,
  KEY `item_description` (`item_description`) USING BTREE,
  KEY `uom` (`uom`) USING BTREE,
  KEY `quantity` (`quantity`) USING BTREE,
  KEY `price` (`price`) USING BTREE,
  KEY `amount` (`amount`) USING BTREE,
  KEY `qty_per_uom` (`qty_per_uom`) USING BTREE,
  KEY `uom_code` (`uom_code`) USING BTREE,
  KEY `posting_date` (`shipment_date`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2559182 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table dsgpm_dev.invoices_lines_copy
CREATE TABLE IF NOT EXISTS `invoices_lines_copy` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `uploaded_by` int(11) NOT NULL,
  `filename` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `group` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch_number` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `vendor_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_code` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `doc_no` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipment_date` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uom` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(13,4) NOT NULL,
  `amount` decimal(13,4) NOT NULL,
  `qty_per_uom` int(11) NOT NULL,
  `uom_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dt_shipment_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table dsgpm_dev.invoices_upload_log
CREATE TABLE IF NOT EXISTS `invoices_upload_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `batch_number` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `summary` text COLLATE utf8mb4_unicode_ci,
  `filename` text COLLATE utf8mb4_unicode_ci,
  `remarks` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `uploaded_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `batch_number` (`batch_number`),
  KEY `uploaded_by` (`uploaded_by`)
) ENGINE=InnoDB AUTO_INCREMENT=395 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table dsgpm_dev.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table dsgpm_dev.notices
CREATE TABLE IF NOT EXISTS `notices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `notice` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table dsgpm_dev.password_resets
CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table dsgpm_dev.principals
CREATE TABLE IF NOT EXISTS `principals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `vendor_code` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `template_variation_count` int(11) DEFAULT '1',
  `proj_status` int(11) DEFAULT '0',
  `active` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  UNIQUE KEY `vendor_code` (`vendor_code`),
  KEY `name` (`name`),
  KEY `proj_status` (`proj_status`),
  KEY `active` (`active`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table dsgpm_dev.principals_customers
CREATE TABLE IF NOT EXISTS `principals_customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `principal_code` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `upload_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `uploaded_by` bigint(20) NOT NULL,
  `distributor_code` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_code` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_code_supplier` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `outlet_type` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `salesman_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `route_code` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `operation_type` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_1` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_2` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_3` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postal_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `principal_code` (`principal_code`),
  KEY `customer_code` (`customer_code`),
  KEY `customer_name` (`customer_name`),
  KEY `customer_code_supplier` (`customer_code_supplier`),
  KEY `distributor_code` (`distributor_code`),
  KEY `salesman_name` (`salesman_name`),
  KEY `route_code` (`route_code`),
  KEY `address_1` (`address_1`),
  KEY `address_2` (`address_2`),
  KEY `address_3` (`address_3`)
) ENGINE=InnoDB AUTO_INCREMENT=297966 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table dsgpm_dev.principals_items
CREATE TABLE IF NOT EXISTS `principals_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `principal_code` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `upload_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `uploaded_by` bigint(20) NOT NULL,
  `item_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `item_code_supplier` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description_supplier` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `uom` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `conversion_uom` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `conversion_qty` int(11) DEFAULT NULL,
  `uom_price` decimal(13,4) DEFAULT NULL,
  `conversion_uom_price` decimal(13,4) DEFAULT NULL,
  `cp_cases` decimal(13,4) DEFAULT NULL,
  `cp_panel_cases` decimal(13,4) DEFAULT NULL,
  `cp_pcs` decimal(13,4) DEFAULT NULL,
  `cp_panel_pcs` decimal(13,4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `description` (`description`),
  KEY `mj_code` (`item_code_supplier`),
  KEY `principal_code` (`principal_code`),
  KEY `description_supplier` (`description_supplier`),
  KEY `upload_date` (`upload_date`),
  KEY `uploaded_by` (`uploaded_by`),
  KEY `uom` (`uom`),
  KEY `conversion_uom` (`conversion_uom`),
  KEY `conversion_qty` (`conversion_qty`),
  KEY `uom_price` (`uom_price`),
  KEY `conversion_uom_price` (`conversion_uom_price`),
  FULLTEXT KEY `item_code` (`item_code`)
) ENGINE=InnoDB AUTO_INCREMENT=31420 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table dsgpm_dev.principals_salesmen
CREATE TABLE IF NOT EXISTS `principals_salesmen` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uploaded_by` int(11) NOT NULL,
  `principal_code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `upload_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `route_code` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sm_code` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sm_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sm_code_supplier` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sm_contact_no` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `division` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `supervisor_contact_no` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `supervisor_name` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group_code` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location_code_supplier` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `principal_code` (`principal_code`),
  KEY `route_code` (`route_code`),
  KEY `sm_code` (`sm_code`),
  KEY `sm_name` (`sm_name`),
  KEY `sm_code_supplier` (`sm_code_supplier`),
  KEY `uploaded_by` (`uploaded_by`),
  KEY `sm_contact_no` (`sm_contact_no`),
  KEY `division` (`division`),
  KEY `supervisor_contact_no` (`supervisor_contact_no`),
  KEY `supervisor_name` (`supervisor_name`),
  KEY `group_code` (`group_code`),
  KEY `location_code_supplier` (`location_code_supplier`)
) ENGINE=InnoDB AUTO_INCREMENT=701 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Salesmen mapping (per principal/supplier)';

-- Data exporting was unselected.

-- Dumping structure for table dsgpm_dev.pterm_return_indicator
CREATE TABLE IF NOT EXISTS `pterm_return_indicator` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `payment_term` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `return_indicator` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Payment term and return indicator mapping';

-- Data exporting was unselected.

-- Dumping structure for table dsgpm_dev.settings
CREATE TABLE IF NOT EXISTS `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'text',
  `principal_code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hint` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1282 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table dsgpm_dev.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `principal_ids` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table dsgpm_dev.websockets_statistics_entries
CREATE TABLE IF NOT EXISTS `websockets_statistics_entries` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `app_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `peak_connection_count` int(11) NOT NULL,
  `websocket_message_count` int(11) NOT NULL,
  `api_message_count` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

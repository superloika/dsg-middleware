-- --------------------------------------------------------
-- Host:                         southpalmsresort.com
-- Server version:               10.3.34-MariaDB - MariaDB Server
-- Server OS:                    Linux
-- HeidiSQL Version:             12.1.0.6557
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table southp20_distribution2.account_group_codes
CREATE TABLE IF NOT EXISTS `account_group_codes` (
  `account_groupcode_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `group_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `group_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `account_classification_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`account_groupcode_id`),
  UNIQUE KEY `account_group_codes_group_code_unique` (`group_code`),
  UNIQUE KEY `account_group_codes_group_name_unique` (`group_name`),
  UNIQUE KEY `account_group_codes_account_classification_id_unique` (`account_classification_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table southp20_distribution2.account_group_codes: ~10 rows (approximately)
INSERT INTO `account_group_codes` (`account_groupcode_id`, `group_code`, `group_name`, `account_classification_id`, `created_at`, `updated_at`) VALUES
	(1, 'SSS', 'Sari-sari Store', '495', '2020-06-29 21:26:39', '2020-07-19 18:50:46'),
	(2, 'DRS', 'Drug Store', '490', '2020-06-29 21:27:24', '2020-07-22 23:49:48'),
	(3, 'GRO', 'Grocery Store', '491', '2020-07-13 18:12:04', '2020-07-13 18:12:04'),
	(4, 'HOR', 'Horeca', '492', '2020-07-13 18:12:19', '2020-07-13 18:12:19'),
	(5, 'OTH', 'Others', '488', '2020-07-13 18:12:40', '2020-07-19 18:23:14'),
	(6, 'PMS', 'Market Stall', '493', '2020-07-13 18:12:56', '2020-07-19 18:07:49'),
	(7, 'CVS', 'Convenience Store', '494', '2022-05-04 00:27:01', '2022-05-04 00:27:01'),
	(8, 'WHS', 'WHOLESALER', '496', '2022-06-29 08:27:55', '2022-06-29 08:27:55'),
	(9, 'BKY', 'BAKERY', '497', '2022-06-30 03:14:15', '2022-06-30 03:14:15'),
	(10, 'SUB', 'SUB-DISTRIBUTOR', '498', '2022-06-30 03:14:57', '2022-06-30 03:14:57'),
	(11, 'SST', 'SMALL - SUPERMARKET', '499', '2022-06-30 03:15:24', '2022-06-30 03:15:24');

-- Dumping structure for table southp20_distribution2.consolidated_transactions
CREATE TABLE IF NOT EXISTS `consolidated_transactions` (
  `consolidated_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `transaction_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sales_invoice` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `posting_date` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `itemcode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `qty` int(11) NOT NULL,
  `unit_price` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_amt` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_w_vat` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `salesman_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uom` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reference_no` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_uploaded` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `flag` int(11) NOT NULL,
  `is_manual` int(11) NOT NULL DEFAULT 0,
  `is_manual_appended` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`consolidated_id`),
  KEY `sales_invoice` (`sales_invoice`),
  KEY `customer_code` (`customer_code`),
  KEY `itemcode` (`itemcode`),
  KEY `qty` (`qty`),
  KEY `unit_price` (`unit_price`),
  KEY `total_amt` (`total_amt`),
  KEY `salesman_code` (`salesman_code`),
  KEY `uom` (`uom`),
  KEY `reference_no` (`reference_no`),
  KEY `flag` (`flag`),
  KEY `status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=85049 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table southp20_distribution2.consolidated_transactions: ~29,964 rows (approximately)
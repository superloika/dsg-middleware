-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 03, 2021 at 10:03 AM
-- Server version: 5.7.31
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `new_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

DROP TABLE IF EXISTS `expenses`;
CREATE TABLE IF NOT EXISTS `expenses` (
  `expense_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `particular` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` double NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `expense_date` date DEFAULT NULL,
  PRIMARY KEY (`expense_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=285 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`expense_id`, `particular`, `amount`, `quantity`, `created_at`, `user_id`, `expense_date`) VALUES
(21, 'ice water', 1, 5, '2021-09-07 07:16:21', 2, '2021-09-10'),
(32, 'halang2x', 25, 1, '2021-09-07 09:09:02', 1, '2021-09-06'),
(33, 'water', 1, 1, '2021-09-07 09:09:07', 1, '2021-09-06'),
(34, 'mighty green', 6, 2, '2021-09-07 09:09:21', 1, '2021-09-06'),
(35, 'coffee', 5, 1, '2021-09-07 09:17:31', 1, '2021-09-06'),
(37, 'gasoline', 100, 1, '2021-09-08 01:47:07', 1, '2021-09-07'),
(40, 'manok sinugba', 25, 1, '2021-09-08 05:21:29', 1, '2021-09-07'),
(41, 'cobra', 15, 1, '2021-09-08 05:21:56', 1, '2021-09-08'),
(42, 'mighty green', 6, 2, '2021-09-08 05:22:25', 1, '2021-09-08'),
(43, 'water', 1, 1, '2021-09-08 05:22:33', 1, '2021-09-08'),
(44, 'water', 5, 1, '2021-09-08 05:22:41', 1, '2021-09-08'),
(47, 'water', 1, 1, '2021-09-08 06:34:02', 1, '2021-09-09'),
(48, 'coffee', 5, 1, '2021-09-08 08:53:57', 1, '2021-09-06'),
(49, 'water', 3, 1, '2021-09-09 00:43:44', 1, '2021-09-07'),
(50, 'sinugba baboy', 30, 1, '2021-09-09 05:00:32', 1, '2021-09-07'),
(51, 'cobra', 15, 1, '2021-09-09 05:00:45', 1, '2021-09-08'),
(52, 'mighty green', 6, 2, '2021-09-09 05:01:06', 1, '2021-09-08'),
(53, 'coffee', 5, 1, '2021-09-09 09:54:43', 1, '2021-09-09'),
(60, 'load regular 50', 55, 1, '2021-09-10 00:10:26', 1, '2021-09-10'),
(61, 'mighty white', 5, 4, '2021-09-10 00:10:37', 1, '2021-09-10'),
(62, 'water', 3, 1, '2021-09-10 00:20:52', 1, '2021-09-10'),
(63, 'coffee', 5, 1, '2021-09-10 02:44:02', 1, '2021-09-10'),
(79, 'halang2x manok', 25, 1, '2021-09-10 05:28:09', 1, '2021-09-10'),
(80, 'cobra', 15, 1, '2021-09-10 05:33:20', 1, '2021-09-03'),
(81, 'mighty green', 6, 2, '2021-09-10 05:33:28', 1, '2021-09-10'),
(92, 'water', 2, 1, '2021-09-13 00:15:37', 1, '2021-09-13'),
(95, 'another test', 12, 3, '2021-09-13 03:00:43', 2, '2021-09-13'),
(97, 'inatayan (baboy)', 25, 1, '2021-09-13 06:32:28', 2, '2021-09-13'),
(98, 'inatayan (baboy)', 25, 1, '2021-09-13 06:38:22', 1, '2021-09-13'),
(99, 'cobra', 15, 1, '2021-09-13 06:38:33', 1, '2021-09-13'),
(100, 'mighty green', 6, 2, '2021-09-13 06:38:54', 1, '2021-09-13'),
(101, 'water', 1, 1, '2021-09-13 06:39:03', 1, '2021-09-13'),
(108, 'manok sinugba', 200, 5, '2021-09-13 10:43:13', 2, '2021-09-13'),
(109, 'water', 2, 1, '2021-09-14 00:06:52', 1, '2021-09-14'),
(110, 'inatayan (baboy)', 25, 1, '2021-09-14 05:01:11', 1, '2021-09-14'),
(111, 'water', 1, 1, '2021-09-14 05:01:22', 1, '2021-09-14'),
(112, 'mighty green', 6, 2, '2021-09-14 05:01:38', 1, '2021-09-14'),
(113, 'gasoline', 60, 1, '2021-09-14 05:02:48', 1, '2021-09-13'),
(114, 'gasoline', 50, 1, '2021-09-14 23:54:18', 1, '2021-09-14'),
(115, 'water', 5, 1, '2021-09-14 23:55:11', 1, '2021-09-15'),
(117, 'coffee', 5, 1, '2021-09-15 01:01:02', 1, '2021-09-15'),
(118, 'shrimp', 30, 1, '2021-09-15 04:55:15', 1, '2021-09-15'),
(119, 'cobra', 15, 1, '2021-09-15 04:55:26', 1, '2021-09-15'),
(120, 'water', 1, 1, '2021-09-15 04:55:35', 1, '2021-09-15'),
(121, 'mighty green', 6, 2, '2021-09-15 04:56:06', 1, '2021-09-15'),
(122, 'cup (white)', 10, 1, '2021-09-15 09:53:28', 1, '2021-09-15'),
(123, 'nescafe stick', 3, 1, '2021-09-15 09:53:45', 1, '2021-09-15'),
(124, 'water (hot)', 5, 1, '2021-09-15 09:53:59', 1, '2021-09-15'),
(125, 'gasoline', 100, 1, '2021-09-16 01:25:30', 1, '2021-09-15'),
(126, 'sinugba baboy', 30, 1, '2021-09-16 04:55:19', 1, '2021-09-16'),
(127, 'water', 1, 1, '2021-09-16 04:55:32', 1, '2021-09-16'),
(130, 'xxx', 1, 1, '2021-09-16 05:07:08', 1, '2021-09-16'),
(131, 'aaa', 1, 1, '2021-09-16 05:08:02', 1, '2021-09-16'),
(132, 'inatayan (baboy)', 25, 1, '2021-09-17 05:08:27', 1, '2021-09-17'),
(133, 'cobra', 15, 1, '2021-09-17 05:09:16', 1, '2021-09-17'),
(134, 'mighty green', 6, 2, '2021-09-17 05:09:37', 1, '2021-09-17'),
(135, 'motorcycle maintenance', 20, 1, '2021-09-17 05:10:12', 1, '2021-09-16'),
(137, 'water', 5, 1, '2021-09-17 05:13:55', 1, '2021-09-17'),
(138, 'gasoline', 60, 1, '2021-09-21 02:03:33', 1, '2021-09-17'),
(139, 'gasoline', 150, 1, '2021-09-23 09:09:05', 1, '2021-09-21'),
(140, 'inatayan (baboy)', 25, 1, '2021-09-23 09:09:39', 1, '2021-09-22'),
(141, 'cobra', 15, 1, '2021-09-23 09:09:52', 1, '2021-09-22'),
(142, 'mighty green', 6, 3, '2021-09-23 09:10:10', 1, '2021-09-22'),
(143, 'coffee', 5, 1, '2021-09-23 09:10:30', 1, '2021-09-22'),
(144, 'coffee', 5, 1, '2021-09-23 09:10:41', 1, '2021-09-23'),
(145, 'inatayan (baboy)', 25, 1, '2021-09-23 09:10:52', 1, '2021-09-23'),
(146, 'cobra', 15, 1, '2021-09-23 09:11:01', 1, '2021-09-23'),
(147, 'water', 1, 1, '2021-09-23 09:11:14', 1, '2021-09-23'),
(148, 'mighty green', 6, 2, '2021-09-23 09:11:48', 1, '2021-09-23'),
(149, 'dinuguan (baka)', 35, 1, '2021-09-24 04:43:43', 1, '2021-09-24'),
(150, 'cobra', 15, 1, '2021-09-24 04:43:58', 1, '2021-09-24'),
(151, 'biogesic', 8, 3, '2021-09-24 04:44:12', 1, '2021-09-24'),
(152, 'mighty green', 6, 5, '2021-09-24 04:44:31', 1, '2021-09-24'),
(153, 'water', 1, 1, '2021-09-24 04:44:42', 1, '2021-09-24'),
(154, 'gasoline', 50, 1, '2021-09-27 02:42:25', 1, '2021-09-24'),
(155, 'water', 2, 1, '2021-09-27 05:02:06', 1, '2021-09-27'),
(156, 'inatayan (baboy)', 25, 1, '2021-09-27 05:02:19', 1, '2021-09-27'),
(157, 'water', 1, 1, '2021-09-27 05:02:27', 1, '2021-09-27'),
(158, 'mighty green', 6, 2, '2021-09-27 06:57:11', 1, '2021-09-27'),
(159, 'matchstick', 3, 1, '2021-09-27 06:57:26', 1, '2021-09-27'),
(160, 'coffee', 5, 1, '2021-09-27 10:59:06', 1, '2021-09-27'),
(161, 'gasoline', 100, 1, '2021-09-28 02:46:38', 1, '2021-09-27'),
(162, 'tortillas', 30, 1, '2021-09-28 23:53:00', 1, '2021-09-28'),
(163, 'cobra', 15, 1, '2021-09-28 23:53:14', 1, '2021-09-28'),
(164, 'water', 1, 1, '2021-09-28 23:53:25', 1, '2021-09-28'),
(165, 'water', 1, 1, '2021-09-28 23:53:46', 1, '2021-09-28'),
(166, 'mighty green', 6, 1, '2021-09-28 23:55:10', 1, '2021-09-28'),
(167, 'matchstick', 3, 1, '2021-09-28 23:55:21', 1, '2021-09-28'),
(168, 'water', 5, 1, '2021-09-28 23:59:38', 1, '2021-09-29'),
(169, 'sud-an (mixed)', 30, 1, '2021-09-29 07:30:46', 1, '2021-09-29'),
(170, 'cobra', 15, 1, '2021-09-29 07:31:07', 1, '2021-09-29'),
(171, 'mighty green', 6, 2, '2021-09-29 07:31:24', 1, '2021-09-29'),
(172, 'water', 1, 1, '2021-09-29 07:31:32', 1, '2021-09-29'),
(174, 'rice', 15, 1, '2021-09-29 07:33:04', 1, '2021-09-29'),
(175, 'gasoline', 100, 1, '2021-09-30 00:14:55', 1, '2021-09-29'),
(176, 'sinugba baboy', 30, 1, '2021-09-30 07:59:57', 1, '2021-09-30'),
(177, 'cobra', 15, 1, '2021-09-30 08:00:07', 1, '2021-09-30'),
(178, 'mighty green', 6, 2, '2021-09-30 08:00:20', 1, '2021-09-30'),
(179, 'water', 1, 1, '2021-09-30 08:00:45', 1, '2021-09-30'),
(180, 'water', 2, 1, '2021-09-30 08:01:36', 1, '2021-09-30'),
(181, 'load regular 50 (globe)', 55, 1, '2021-10-01 00:15:56', 1, '2021-09-30'),
(182, 'mighty white', 5, 4, '2021-10-01 00:16:13', 1, '2021-09-30'),
(183, 'cheese burger', 30, 1, '2021-10-01 00:16:38', 1, '2021-10-01'),
(184, 'fried chicken', 15, 1, '2021-10-05 06:30:41', 1, '2021-10-05'),
(185, 'ampalaya with egg', 10, 1, '2021-10-05 06:31:00', 1, '2021-10-05'),
(186, 'cobra', 15, 1, '2021-10-05 06:31:13', 1, '2021-10-05'),
(187, 'mighty green', 6, 2, '2021-10-05 06:31:28', 1, '2021-10-05'),
(188, 'lighter', 12, 1, '2021-10-05 06:31:40', 1, '2021-10-05'),
(189, 'water', 3, 1, '2021-10-05 06:31:52', 1, '2021-10-05'),
(190, 'fried chicken', 15, 1, '2021-10-06 09:37:34', 1, '2021-10-06'),
(191, 'cobra', 15, 1, '2021-10-06 09:37:47', 1, '2021-10-06'),
(192, 'mighty green', 6, 2, '2021-10-06 09:37:59', 1, '2021-10-06'),
(193, 'water', 3, 1, '2021-10-06 09:38:12', 1, '2021-10-06'),
(194, 'cloud 9', 15, 2, '2021-10-06 09:47:51', 1, '2021-10-06'),
(195, 'gasoline', 50, 1, '2021-10-07 00:02:41', 1, '2021-10-06'),
(197, 'cobra', 15, 1, '2021-10-07 10:06:45', 1, '2021-10-07'),
(198, 'mighty green', 6, 2, '2021-10-07 10:06:54', 1, '2021-10-07'),
(199, 'water', 1, 1, '2021-10-07 10:07:01', 1, '2021-10-07'),
(200, 'water', 2, 1, '2021-10-07 10:07:10', 1, '2021-10-07'),
(202, 'fried chicken', 15, 1, '2021-10-11 02:32:12', 1, '2021-10-07'),
(203, 'missed recording', 50, 1, '2021-10-11 02:32:35', 1, '2021-10-08'),
(204, 'bicol express', 30, 1, '2021-10-11 05:25:31', 1, '2021-10-11'),
(206, 'mighty green', 6, 2, '2021-10-11 05:25:54', 1, '2021-10-11'),
(207, 'matchstick', 3, 1, '2021-10-11 05:26:02', 1, '2021-10-11'),
(208, 'water', 3, 1, '2021-10-11 05:26:13', 1, '2021-10-11'),
(209, 'cobra', 15, 1, '2021-10-11 05:26:57', 1, '2021-10-11'),
(210, 'gasoline', 100, 1, '2021-10-12 05:37:34', 1, '2021-10-11'),
(211, 'sinugba baboy', 30, 1, '2021-10-12 05:37:50', 1, '2021-10-12'),
(212, 'mighty green', 6, 2, '2021-10-12 05:37:59', 1, '2021-10-12'),
(213, 'water', 3, 1, '2021-10-12 05:38:11', 1, '2021-10-12'),
(214, 'gasoline', 50, 1, '2021-10-13 03:59:15', 1, '2021-10-12'),
(215, 'lumpia', 8, 2, '2021-10-18 05:08:10', 1, '2021-10-18'),
(216, 'water', 1, 2, '2021-10-18 05:08:29', 1, '2021-10-18'),
(217, 'mighty green', 6, 1, '2021-10-18 05:08:49', 1, '2021-10-18'),
(218, 'water', 2, 1, '2021-10-18 05:08:57', 1, '2021-10-18'),
(219, 'manok sinugba', 15, 1, '2021-10-19 09:04:39', 1, '2021-10-19'),
(220, 'ampalaya with egg', 15, 1, '2021-10-19 09:04:49', 1, '2021-10-19'),
(221, 'cobra', 15, 1, '2021-10-19 09:04:57', 1, '2021-10-19'),
(222, 'water', 5, 1, '2021-10-19 09:05:08', 1, '2021-10-19'),
(223, 'utan nangka', 15, 1, '2021-10-20 05:22:47', 1, '2021-10-20'),
(224, 'water', 5, 1, '2021-10-20 05:23:10', 1, '2021-10-20'),
(225, 'mighty green', 6, 1, '2021-10-20 05:23:22', 1, '2021-10-20'),
(226, 'batong', 15, 1, '2021-10-22 10:06:44', 1, '2021-10-22'),
(227, 'cobra', 15, 1, '2021-10-22 10:06:53', 1, '2021-10-22'),
(228, 'mighty green', 6, 2, '2021-10-22 10:07:03', 1, '2021-10-22'),
(229, 'water', 2, 1, '2021-10-22 10:07:16', 1, '2021-10-22'),
(231, 'utan nangka', 15, 1, '2021-10-22 10:08:21', 1, '2021-10-21'),
(232, 'mighty green', 6, 2, '2021-10-22 10:08:31', 1, '2021-10-21'),
(233, 'gasoline', 100, 1, '2021-10-22 10:08:43', 1, '2021-10-21'),
(234, 'water', 5, 1, '2021-10-22 10:08:51', 1, '2021-10-21'),
(235, 'cloud 9', 8, 1, '2021-10-22 10:09:08', 1, '2021-10-21'),
(236, 'cloud 9', 8, 2, '2021-10-22 10:09:18', 1, '2021-10-22'),
(237, 'halang2x manok', 25, 1, '2021-10-26 03:41:10', 1, '2021-10-25'),
(238, 'cobra', 15, 1, '2021-10-26 03:41:29', 1, '2021-10-25'),
(239, 'mighty green', 6, 2, '2021-10-26 03:41:39', 1, '2021-10-25'),
(240, 'matchstick', 3, 1, '2021-10-26 03:41:52', 1, '2021-10-25'),
(241, 'monggo ginataan', 15, 1, '2021-10-27 09:04:04', 1, '2021-10-27'),
(242, 'mighty green', 6, 1, '2021-10-27 09:04:14', 1, '2021-10-27'),
(243, 'water', 1, 1, '2021-10-27 09:04:21', 1, '2021-10-27'),
(244, 'gasoline', 60, 1, '2021-10-28 05:05:47', 1, '2021-10-27'),
(245, 'ampalaya with egg', 15, 1, '2021-10-28 05:05:57', 1, '2021-10-28'),
(246, 'cobra', 15, 1, '2021-10-28 05:06:05', 1, '2021-10-28'),
(247, 'mighty green', 6, 2, '2021-10-28 05:06:14', 1, '2021-10-28'),
(248, 'water', 2, 1, '2021-10-28 05:06:28', 1, '2021-10-28'),
(249, 'gasoline', 60, 1, '2021-10-29 06:25:02', 1, '2021-10-28'),
(250, 'halang2x manok', 25, 1, '2021-10-29 06:25:14', 1, '2021-10-29'),
(251, 'cobra', 15, 1, '2021-10-29 06:25:25', 1, '2021-10-29'),
(252, 'mighty green', 6, 2, '2021-10-29 06:25:39', 1, '2021-10-29'),
(253, 'cloud 9', 15, 2, '2021-10-29 06:25:59', 1, '2021-10-29'),
(254, 'pechay gisado', 15, 1, '2021-11-02 08:07:44', 1, '2021-11-02'),
(255, 'cobra', 15, 1, '2021-11-02 08:07:52', 1, '2021-11-02'),
(256, 'water', 1, 1, '2021-11-02 08:08:02', 1, '2021-11-02'),
(257, 'gasoline', 100, 1, '2021-11-03 03:25:26', 1, '2021-11-02'),
(258, 'halang2x manok', 25, 1, '2021-11-03 06:53:45', 1, '2021-11-03'),
(259, 'cobra', 15, 1, '2021-11-03 06:53:54', 1, '2021-11-03'),
(260, 'mighty green', 6, 1, '2021-11-03 06:54:01', 1, '2021-11-03'),
(261, 'coffee', 5, 1, '2021-11-03 06:54:10', 1, '2021-11-03'),
(262, 'manok sinugba', 25, 1, '2021-11-05 07:05:11', 1, '2021-11-05'),
(263, 'cobra', 15, 1, '2021-11-05 07:05:20', 1, '2021-11-05'),
(264, 'mighty green', 6, 2, '2021-11-05 07:05:32', 1, '2021-11-05'),
(265, 'water', 3, 1, '2021-11-05 07:05:42', 1, '2021-11-05'),
(266, 'utan nangka', 15, 1, '2021-11-08 05:02:49', 1, '2021-11-08'),
(267, 'cobra', 15, 1, '2021-11-08 05:02:59', 1, '2021-11-08'),
(268, 'mighty green', 6, 1, '2021-11-08 05:03:18', 1, '2021-11-08'),
(269, 'water', 1, 1, '2021-11-08 05:03:27', 1, '2021-11-08'),
(270, 'ampalaya with egg', 15, 1, '2021-11-09 05:29:51', 1, '2021-11-09'),
(271, 'mighty green', 6, 1, '2021-11-09 05:30:01', 1, '2021-11-09'),
(272, 'water', 4, 1, '2021-11-09 05:30:11', 1, '2021-11-09'),
(273, 'gasoline', 100, 1, '2021-11-10 02:09:11', 1, '2021-11-09'),
(274, 'monggo ginataan', 15, 1, '2021-11-10 06:51:58', 1, '2021-11-10'),
(275, 'water', 1, 1, '2021-11-10 06:52:07', 1, '2021-11-10'),
(276, 'coffee', 5, 2, '2021-11-10 06:52:18', 1, '2021-11-10'),
(277, 'mighty green', 6, 1, '2021-11-10 06:52:26', 1, '2021-11-10'),
(278, 'inatayan (baboy)', 40, 1, '2021-11-11 05:27:02', 1, '2021-11-11'),
(279, 'water', 4, 1, '2021-11-11 05:27:11', 1, '2021-11-11'),
(280, 'mighty green', 6, 1, '2021-11-11 05:27:23', 1, '2021-11-11'),
(281, 'manok sinugba', 25, 1, '2021-11-17 06:12:28', 1, '2021-11-17'),
(282, 'cobra', 15, 1, '2021-11-17 06:12:39', 1, '2021-11-17'),
(283, 'mighty green', 6, 1, '2021-11-17 06:12:48', 1, '2021-11-17'),
(284, 'water', 4, 1, '2021-11-17 06:13:04', 1, '2021-11-17');

-- --------------------------------------------------------

--
-- Table structure for table `expenses_tags`
--

DROP TABLE IF EXISTS `expenses_tags`;
CREATE TABLE IF NOT EXISTS `expenses_tags` (
  `tag_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(20) NOT NULL,
  PRIMARY KEY (`tag_id`),
  UNIQUE KEY `tag_name` (`tag_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `expenses_tags`
--

INSERT INTO `expenses_tags` (`tag_id`, `tag_name`) VALUES
(4, 'bisyo'),
(3, 'sud-an'),
(1, 'tag1'),
(2, 'tag2');

-- --------------------------------------------------------

--
-- Table structure for table `expenses_tags_pivot`
--

DROP TABLE IF EXISTS `expenses_tags_pivot`;
CREATE TABLE IF NOT EXISTS `expenses_tags_pivot` (
  `expenses_tags_pivot_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `expense_id` bigint(20) UNSIGNED NOT NULL,
  `tag_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`expenses_tags_pivot_id`),
  KEY `tag_id` (`tag_id`),
  KEY `expense_id` (`expense_id`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `expenses_tags_pivot`
--

INSERT INTO `expenses_tags_pivot` (`expenses_tags_pivot_id`, `expense_id`, `tag_id`) VALUES
(3, 32, 3),
(4, 121, 4),
(7, 126, 3),
(10, 125, 1),
(11, 124, 2),
(12, 123, 1),
(13, 122, 2),
(14, 120, 1),
(15, 119, 2),
(16, 119, 1),
(19, 34, 4),
(20, 35, 4),
(21, 37, 1),
(22, 40, 3),
(23, 41, 4),
(24, 43, 1),
(25, 44, 1),
(26, 47, 1),
(27, 48, 4),
(28, 49, 1),
(29, 50, 3),
(35, 53, 4),
(36, 60, 1),
(37, 61, 4),
(38, 62, 1),
(39, 63, 4),
(40, 79, 3),
(41, 80, 4),
(42, 81, 4),
(43, 92, 1),
(44, 98, 3),
(45, 99, 4),
(46, 100, 4),
(47, 101, 1),
(48, 109, 1),
(49, 110, 3),
(50, 111, 1),
(51, 112, 4),
(52, 113, 1),
(53, 114, 1),
(54, 115, 1),
(55, 117, 4),
(56, 118, 3),
(57, 127, 1),
(58, 52, 4),
(59, 51, 4),
(60, 42, 4),
(61, 33, 1),
(75, 131, 4),
(79, 130, 1);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `email`, `email_verified_at`, `password`, `user_type`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Carlo Lomod', 'admin', NULL, NULL, '$2y$10$Xw2pShV15og9mtcw6dhbh.QT3dbiXJMAg6w.j723MGWLfRMTp.VOa', 'super_admin', NULL, '2021-11-17 16:52:42', '2021-11-17 16:52:42'),
(2, 'john doe', 'john1', 'john@test.com', NULL, '$2y$10$QdTFM0EW91q7VR..fM3SeOkFfxOnSnCncGkJtDyGAvuo60ftJbu92', 'user', NULL, '2021-12-01 02:28:06', '2021-12-01 02:28:06');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

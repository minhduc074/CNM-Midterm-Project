-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 17, 2018 at 01:03 PM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `midterm_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `fullname` varchar(1024) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` varchar(1024) NOT NULL,
  `geocoding` varchar(255) DEFAULT NULL,
  `note` varchar(1024) NOT NULL,
  `status` int(11) NOT NULL,
  `staff` varchar(255) DEFAULT NULL,
  `driver` varchar(255) DEFAULT NULL,
  `create_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `fullname`, `phone`, `address`, `geocoding`, `note`, `status`, `staff`, `driver`, `create_time`) VALUES
(1, '1', '123456789', 'asd/123v/123asd', NULL, 'somethings', 1, '', '', '2018-11-01 19:26:12'),
(2, 'customer1', '123456789', 'asd/123v/123asd', NULL, 'somethings', 1, '', '', '2018-11-01 19:32:34'),
(3, 'customer1', '123456789', 'asd/123v/123asd', '{\"lat\":10.852237435070418,\"lng\":106.62910183964232}', 'somethings', 1, '', '', '2018-11-01 19:33:30'),
(7, 'Bùi Minh Đức', '+84963055407', 'Đường Số 2, Công Viên Phần Mềm Quang Trung, Phường Tân Chánh Hiệp, Quận 12', NULL, '123123', 2, '', '', '2018-11-13 15:42:47'),
(8, 'Customer1', '0123456', 'adsresc', NULL, 'note 1', 1, 'staff 1', 'driver 1', '2018-11-17 09:54:42'),
(9, 'Customer1', '0123456', 'adsresc', NULL, 'note 1', 1, 'staff 1', 'driver 1', '2018-11-17 09:56:25'),
(10, 'Customer1', '0123456', 'adsresc', NULL, 'note 1', 1, 'staff 1', 'driver 1', '2018-11-17 09:57:36'),
(11, 'Customer1', '0123456', 'adsresc', NULL, 'note 1', 1, 'staff 1', 'driver 1', '2018-11-17 09:58:45'),
(12, 'Customer1', '0123456', 'adsresc', NULL, 'note 1', 1, 'staff 1', 'driver 1', '2018-11-17 09:59:26'),
(13, 'Customer1', '0123456', 'adsresc', NULL, 'note 1', 1, 'staff 1', 'driver 1', '2018-11-17 10:00:02'),
(14, 'Customer1', '0123456', 'adsresc', NULL, 'note 1', 1, 'staff 1', 'driver 1', '2018-11-17 10:02:21'),
(15, 'Customer1', '0123456', 'adsresc', NULL, 'note 1', 1, 'staff 1', 'driver 1', '2018-11-17 10:05:50'),
(16, 'Customer1', '0123456', 'adsresc', NULL, 'note 1', 1, 'staff 1', 'driver 1', '2018-11-17 10:08:38'),
(17, 'new customer 1', '0011223344', 'Linh Trung, Thủ Đức, Hồ Chí Minh, Vietnam', NULL, 'new note 1', 0, '', '', '2018-11-17 13:23:14'),
(18, 'New customer 2', '00221133', 'Thủ Đức, Ho Chi Minh City, Vietnam', NULL, 'Note1', 0, '', '', '2018-11-17 13:26:26'),
(19, 'New Customer 2', '1234123', 'Linh Trung, Thủ Đức, Hồ Chí Minh, Vietnam', NULL, 'sdsaxzc', 0, '', '', '2018-11-17 13:31:06');

-- --------------------------------------------------------

--
-- Table structure for table `driver`
--

CREATE TABLE `driver` (
  `username` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `address` varchar(2000) NOT NULL,
  `geocoding` varchar(255) NOT NULL,
  `phone` varchar(64) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `updated_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `driver`
--

INSERT INTO `driver` (`username`, `status`, `address`, `geocoding`, `phone`, `password`, `fullname`, `updated_time`) VALUES
('admin1', 0, 'address', '{\"lat\":10.85136292304024,\"lng\":106.69537735089773}', '', '123456', '', '0000-00-00 00:00:00'),
('driver1', 1, '63 Linh Trung, Phường Linh Trung, Thủ Đức, Hồ Chí Minh, Vietnam', '{\"lat\":10.856984850355982,\"lng\":106.75733492735344}', '+1 510 803 7664', '123456', 'Bùi Minh Đức', '0000-00-00 00:00:00'),
('driver3', 1, '94, Đường Số 6, Phường Linh Trung, Quận Thủ Đức, Thành Phố Hồ Chí Minh, Thành Phố Hồ Chí Minh, Phường Linh Trung, Thủ Đức, Hồ Chí Minh, Vietnam', '{\"lat\":10.85136292304024,\"lng\":106.69537735089773}', '+849630554071234', '123', 'Bùi Minh Đức', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

CREATE TABLE `ticket` (
  `user_id` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `release_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ticket`
--

INSERT INTO `ticket` (`user_id`, `token`, `release_date`) VALUES
('driver_admin1', 'bnpXFw5sCGwND2pX3Vq23DMTxBi1NzYMdaauI5iOnwa09BpUWSY3Q4NcjGoY2loy3EGauRLp7WXE409L', '2018-11-17 18:54:08'),
('driver_driver1', 'MAu1n90TCJV3oAthbydIKpbeMJxVJwJ3tPVX61cYydG8GVyuxbysH93qQRbChzF4dVPGmok0NlVAETBn', '2018-11-17 18:56:48'),
('driver_driver3', '3lC2vVxRp3LVttlnbXrsCULryKU6gNYfSDZjSt7TKgJx9YV09H8EfpDq9RAu0IzSrgoV2QfO9x5oLmi9', '2018-11-17 18:53:13'),
('staff_admin1', 'UUG1iIqViDFgt3j1sW6Ks2aLUxm5QOG9T2nyjeKKc4VhBVxBxWNePNGvz1KN3leUVOeAlhZQvWMPAfYt', '2018-11-17 19:01:46'),
('staff_r1', 'GvruLqgHeX9JNAaZerSZf45wq8UYAdg4AH09v4tQanmFbL004ySuJgSlVuWDf908yXTZ7NHsmgmbOzMg', '2018-11-17 16:02:04'),
('staff_r2', 'drMQfzgpZd3DBlqL3uXcvyBT5HWe8osZPTYCjV0f6oUEJEUlUPIg4SGv5TWq7KEiBsQL8E1h8Gl37L00', '2018-11-17 13:30:28'),
('staff_staff1', 'eQJGBuiulvITgZFLKygqe9qOP6zxjUMq755QYeKUksTXFgqHKCQaP4GZSqirARD5tvnQKryIL1Uc9Y5d', '2018-11-15 20:48:38'),
('staff_staff2', 'wJQL6rnzMWKwQdDpiu1HY68TbqO0aPEllccKrr90eui7FyhBU8qzXGQOjnMxERd28oaf9tAVelhVUs5Q', '2018-11-17 10:08:24'),
('staff_staff3', '1dHEfrWx7HNSCUjSTYNsnZPO60DyCOEtKEklt3egGIwi7dIcpkr2sawwjd3Sr8e8vlEJHHM517yOjDaJ', '2018-11-13 16:40:31');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`, `fullname`, `role`) VALUES
('admin', '123456', 'administrator', 1),
('admin1', '123456', 'fullname345341', 0),
('r1', '123456', 'Bùi Minh Đức', 2),
('r2', '123456', 'Bùi Minh Đức', 2),
('staff1', '123', 'Bùi Minh Đức', 1),
('staff2', '123456', 'Bùi Minh Đức', 2),
('staff3', '123', 'Bùi Minh Đức', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `driver`
--
ALTER TABLE `driver`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 14, 2018 at 12:49 PM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.10

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
(3, 'customer1', '123456789', 'asd/123v/123asd', '{\"lat\":10.852237435070418,\"lng\":106.62910183964232}', 'somethings', 2, '', '', '2018-11-01 19:33:30'),
(7, 'Bùi Minh Đức', '+84963055407', 'Đường Số 2, Công Viên Phần Mềm Quang Trung, Phường Tân Chánh Hiệp, Quận 12', NULL, '123123', 2, '', '', '2018-11-13 15:42:47');

-- --------------------------------------------------------

--
-- Table structure for table `driver`
--

CREATE TABLE `driver` (
  `username` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `address` varchar(2000) NOT NULL,
  `phone` varchar(64) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `updated_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `driver`
--

INSERT INTO `driver` (`username`, `status`, `address`, `phone`, `password`, `fullname`, `updated_time`) VALUES
('admin1', 0, 'address', '', '123456', '', '0000-00-00 00:00:00'),
('driver1', 0, 'undefined', '+1 510 803 7664', '123456', 'Bùi Minh Đức', '0000-00-00 00:00:00'),
('driver3', 0, 'A174 Tổ 15A Kp2, Đông Hưng Thuận, Quận 12, Hồ Chí Minh, Vietnam', '+849630554071234', '123', 'Bùi Minh Đức', '0000-00-00 00:00:00');

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
('driver_driver1', 'jSlHE2XCVdTnh1RycSPINLg7Ch5AHi7Hvx7VCLlvW9dwL7uwm1nhaWNneKwifd0grvvrz4lsuH0we5C0', '2018-11-07 14:09:03'),
('driver_driver3', 'J13UwPi6BFX1WPyTVNfRrlI4YvmP6G9cV5klmnv6jn1ZhOxU7nZXdCqO511uHMtkupHhwxZMDzl4iNhD', '2018-11-14 11:58:38'),
('staff_staff1', 'MhNeao9v2lB1yyeYPy4oBjsmV8NndHXyiGBDpqqDwS4OXmRITRAXN3XKwMyoO1ZEC953ORH3hSl5BerR', '2018-11-14 17:58:29'),
('staff_staff2', 'hnhNOGxE7f1DeNSdW79MhOBOb0bK4bgAQz1zXyUmtt1sRO9XottxZiBizRheOivJfZTuujCC7NexSbLc', '2018-11-12 19:03:23'),
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

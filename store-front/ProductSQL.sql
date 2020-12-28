# Dump of table product
# ------------------------------------------------------------

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `active` bit(1) NOT NULL,
  `product_author` varchar(255) DEFAULT NULL,
  `product_category` varchar(255) DEFAULT NULL,
  `product_description` text,
  `format` varchar(255) DEFAULT NULL,
  `product_type` int(11) NOT NULL,
  `list_price` double NOT NULL,
  `product_title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;

INSERT INTO `product` (`id`, `active`, `product_author`, `product_category`, `product_description`, `product_type`, `in_stock_number`,  `list_price`,  `product_title`)
VALUES
	(1,b'1','Allan', 'category 1', 'description1','type1',4,111,'iphone'),
	(2,b'1','Allan', 'category 1', 'description1','type1',4,111,'iphone'),
	(3,b'1','Allan', 'category 1', 'description1','type1',4,111,'iphone'),
	(4,b'1','Allan', 'category 1', 'description1','type1',4,111,'iphone'),
	(5,b'1','Allan', 'category 1', 'description1','type1',4,111,'iphone')

/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

-- HACKUPC.Duelos definition

CREATE TABLE `Duelos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `starts` tinyint(1) NOT NULL DEFAULT '0',
  `name1` varchar(20) NOT NULL,
  `name2` varchar(20) DEFAULT NULL,
  `result1` int DEFAULT 0,
  `result2` int DEFAULT 0,
  PRIMARY KEY (`id`)
) 

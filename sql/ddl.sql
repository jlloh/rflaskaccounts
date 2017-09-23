CREATE DATABASE webapp;

CREATE USER webapp identified by 'password';

DROP TABLE IF EXISTS webapp.users;
CREATE TABLE `webapp.users` (
	  `id` int(11) NOT NULL,
	  `email` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
	  `roles` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
	  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

GRANT SELECT on webapp.users to webapp;

INSERT INTO webapp.users (email, roles) values ('test@gmail.com', 'admin');

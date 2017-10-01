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

DROP TABLE IF EXISTS webapp.transactions;
CREATE TABLE webapp.transactions (
    id int(11) NOT NULL
  , year varchar(256)
  , month varchar(256)
  , day varchar(256)
  , account varchar(256)
  , amount decimal(20,2) 
  , currency varchar(256)
  , description text
  , PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

GRANT ALL PRIVILEGES ON `webapp`.`transactions` TO 'webapp'@'%';

--import from sqlite csv file
load data local infile 'fullpath/transactions.csv' into table transactions fields terminated by ',' lines terminated by '\n';
update transactions set description = replace(description, '"', '') where description like '%"%';
update transactions set account = replace(account, '"', '') where account like '%"%';
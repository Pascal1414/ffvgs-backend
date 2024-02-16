Drop DATABASE IF EXISTS `ffvgs`;
Create DATABASE `ffvgs`;
CREATE TABLE `ffvgs`.`users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(45) NOT NULL,
    `password` VARCHAR(45) NOT NULL,
    `lastLogin` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);
CREATE TABLE `ffvgs`.`Date` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `programm_id` INT NOT NULL,
    PRIMARY KEY (`id`)
);
CREATE TABLE `ffvgs`.`Programms` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `description` TEXT NOT NULL,
    PRIMARY KEY (`id`)
)
DROP DATABASE movies;

CREATE DATABASE movies;

USE movies;

CREATE TABLE top_movies (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

-- Use: "mysql -u root < schema.sql" in terminal to create database.

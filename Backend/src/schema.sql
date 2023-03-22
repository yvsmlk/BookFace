CREATE DATABASE IF NOT EXISTS bookface ;

USE bookface ;

CREATE TABLE users (
    id int PRIMARY KEY AUTO_INCREMENT ,
    banner int DEFAULT 0,
    picture int DEFAULT 1,
    username VARCHAR(100),
    email VARCHAR(100),
    pwd VARCHAR(100),
    status int,
    created_at datetime not null
);

CREATE TABLE sessions (
    id int PRIMARY KEY AUTO_INCREMENT ,
    user_id int not null
);


CREATE TABLE tags (
    id int PRIMARY KEY AUTO_INCREMENT ,
    context_id int not null,
    tag VARCHAR(100),
    type VARCHAR(100)
);

CREATE TABLE participations (
    id int PRIMARY KEY AUTO_INCREMENT ,
    context_id int not null,
    subscription_id int not null,
    context_type VARCHAR(100),
    subscription_type VARCHAR(100)
);


CREATE TABLE grouplist (
    id int PRIMARY KEY AUTO_INCREMENT ,
    user_id int not null,
    name VARCHAR(100) DEFAULT 'group',
    created_at datetime not null
    
);

CREATE TABLE events (
    id int PRIMARY KEY AUTO_INCREMENT ,
    user_id int not null,
    start datetime not null,
    finish datetime not null,
    name VARCHAR(100) DEFAULT 'event',
    description varchar(2048) DEFAULT 'event description',
    place VARCHAR (250)
);

CREATE TABLE comments (
    id int PRIMARY KEY AUTO_INCREMENT ,
    user_id int not null,
    post_id int not null,
    parent_comment int,
    content varchar(2048),
    created_at datetime not null,
    likes int DEFAULT 0
);

CREATE TABLE notifications (
    id int PRIMARY KEY AUTO_INCREMENT ,
    sender_id int not null,
    receiver int not null,
    context_id int not NULL,
    type VARCHAR(50)
);

CREATE TABLE posts (
    id int PRIMARY KEY AUTO_INCREMENT ,
    user_id int not null,
    media_id int not null,
    content varchar(2048) ,
    created_at datetime,
    likes int DEFAULT 0
);

CREATE TABLE media (
    id int PRIMARY KEY AUTO_INCREMENT ,
    type VARCHAR(50) not null,
    link varchar(200)
);

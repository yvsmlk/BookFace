CREATE DATABASE IF NOT EXISTS bookface ;

USE bookface ;

CREATE TABLE bf_users (
    id int PRIMARY KEY AUTO_INCREMENT ,
    banner int DEFAULT 0,
    picture int DEFAULT 1,
    username VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    pwd VARCHAR(100),
    status int,
    created_at datetime not null,
    INDEX UX (email)
);

-- create unique index UX on users (email)

CREATE TABLE bf_sessions (
    id int PRIMARY KEY AUTO_INCREMENT ,
    user_id int not null
);


CREATE TABLE bf_tags (
    id int PRIMARY KEY AUTO_INCREMENT ,
    context_id int not null FOREIGN KEY,
    tag VARCHAR(100) not NULL UNIQUE,
    type VARCHAR(100) not NULL,
);

-- create unique index UX on tags (tag)

CREATE TABLE bf_grouplist (
    id int PRIMARY KEY AUTO_INCREMENT ,
    user_id int not null,
    name VARCHAR(100) DEFAULT 'group',
    created_at datetime not null,
    INDEX UX (name)
);

CREATE TABLE bf_events (
    id int PRIMARY KEY AUTO_INCREMENT ,
    user_id int not null,
    start datetime not null,
    finish datetime not null,
    name VARCHAR(100) DEFAULT 'event',
    description varchar(2048) DEFAULT 'event description',
    place VARCHAR (250)
);

CREATE TABLE bf_comments (
    id int PRIMARY KEY AUTO_INCREMENT ,
    user_id int not null,
    post_id int not null,
    parent_comment int default -1,
    content varchar(2048),
    created_at datetime not null
);

CREATE TABLE bf_likes (
    context_id int not null,
    type varchar(50),
    user_id int not null,
    do_delete boolean default false,
    PRIMARY KEY (context_id, user_id)
);

CREATE TABLE bf_notifications (
    id int PRIMARY KEY AUTO_INCREMENT ,
    sender_id int not null,
    receiver int not null,
    context_id int not NULL,
    type VARCHAR(50)
);

CREATE TABLE bf_posts (
    id int PRIMARY KEY AUTO_INCREMENT ,
    user_id int not null,
    media_id int not null,
    content varchar(2048) ,
    created_at datetime
);

CREATE TABLE bf_media (
    id int PRIMARY KEY AUTO_INCREMENT ,
    type VARCHAR(50) not null,
    link varchar(200)
);

CREATE TABLE bf_userFollow (
    user_id int not null,
    follower_id int not null,
    PRIMARY KEY (user_id, follower_id)
);

CREATE TABLE bf_userGroup (
    user_id int not null,
    group_id int not null,
    PRIMARY KEY (user_id, group_id)
);

CREATE TABLE bf_groupPosts (
    post_id int not null,
    group_id int not null,
    PRIMARY KEY (post_id, group_id)
);

CREATE TABLE bf_registeredPosts (
    user_id int not null,
    post_id int not null,
    PRIMARY KEY (user_id, post_id)
);
--create database first before running any other code
CREATE DATABASE loginsystem;

CREATE TABLE users (
	user_id int(11) not null AUTO_INCREMENT PRIMARY KEY,
	user_first varchar(256) not null,
	user_last varchar(256) not null,
	user_email varchar(256) not null,
	user_uid varchar(256) not null,
	user_pwd varchar(256) not null,
	user_role varchar(256) not null,
	user_location varchar(256),
	user_bio varchar(1000),
	rating int(11),
	number_visits int(11),
  rating_sum int(11),
  phone_number varchar(15) not null
);

CREATE TABLE appointment (
	appointment_num int(11) not null AUTO_INCREMENT PRIMARY KEY,
	user_idPatient int(11) not null,
	user_idVolunteer int(11) not null,
	appointment_detail varchar(2000) not null,
	appointment_date date not null,
	appointment_status int(1) not null,
  vol_review int(1) not null,
	pat_review int(1) not null
);
--status 1: accepted, status 2: declined, status 3: pending, status 4: done	

--run above code first to create tables, then add foreign keys
ALTER TABLE appointment ADD FOREIGN KEY (user_idPatient) REFERENCES users(user_id);
ALTER TABLE appointment ADD FOREIGN KEY (user_idPatient) REFERENCES users(user_id);



 
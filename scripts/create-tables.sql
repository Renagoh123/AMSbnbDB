USE AMS_Airbnb_Pricing;

-- create normalized tables 
DROP TABLE IF EXISTS hosts;
DROP TABLE IF EXISTS roomType;
DROP TABLE IF EXISTS dayType;
DROP TABLE IF EXISTS listings;
DROP TABLE IF EXISTS prices;
DROP TABLE IF EXISTS ratingCategory;
DROP TABLE IF EXISTS reviews;

CREATE TABLE roomType (
  room_type_id int PRIMARY KEY AUTO_INCREMENT,
  room_type varchar(255)
);

CREATE TABLE dayType (
  day_type varchar(10) PRIMARY KEY
);

CREATE TABLE listings (
  listing_id int PRIMARY KEY AUTO_INCREMENT,
  capacity int,
  num_of_bedrooms int,
  is_super_host tinyint,
  room_type_id int,
  FOREIGN KEY (room_type_id) REFERENCES roomType (room_type_id)
);

CREATE TABLE prices (
  price_id int PRIMARY KEY AUTO_INCREMENT,
  real_sum float,
  listing_id int,
  day_type varchar(10),
  FOREIGN KEY (listing_id) REFERENCES listings (listing_id),
  FOREIGN KEY (day_type) REFERENCES dayType (day_type)
);

CREATE TABLE ratingCategory (
  rating_cat_id int PRIMARY KEY AUTO_INCREMENT,
  rating_category varchar(255)
);

CREATE TABLE reviews (
  review_id int PRIMARY KEY AUTO_INCREMENT,
  guest_satisfaction_score int,
  listing_id int,
  rating_cat_id int,
  FOREIGN KEY (listing_id) REFERENCES listings (listing_id),
  FOREIGN KEY (rating_cat_id) REFERENCES ratingCategory (rating_cat_id)
);


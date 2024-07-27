USE AMS_Airbnb_Pricing;

DROP TABLE IF EXISTS denormalised_ams_data;
-- Create the denormalised table
CREATE TABLE denormalised_ams_data (
    realSum float,
    room_type varchar(255),
    person_capacity int,
    host_is_superhost tinyint,
    guest_satisfaction_overall int,
    bedrooms int,
    day_type varchar(10),
    rating_category varchar(255)
);

LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\amsterdam-listings-cleaned.csv'
INTO TABLE denormalised_ams_data
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

DROP TABLE IF EXISTS pivot_listings, pivot_prices, pivot_reviews;

-- Create a pivot table for listings
CREATE TABLE pivot_listings AS (
    SELECT
        person_capacity AS capacity,
        bedrooms AS num_of_bedrooms,
        host_is_superhost AS is_super_host,
        room_type
    FROM denormalised_ams_data
);

-- Create a pivot table for prices
CREATE TABLE pivot_prices AS (
    SELECT
        person_capacity AS capacity,
        bedrooms AS num_of_bedrooms,
        host_is_superhost AS is_super_host,
        room_type,
        realSum,
        day_type
    FROM denormalised_ams_data
);

-- Create a pivot table for reviews
CREATE TABLE pivot_reviews AS (
    SELECT
        person_capacity AS capacity,
        bedrooms AS num_of_bedrooms,
        host_is_superhost AS is_super_host,
        room_type,
        guest_satisfaction_overall AS guest_satisfaction_score,
        rating_category
    FROM denormalised_ams_data
);


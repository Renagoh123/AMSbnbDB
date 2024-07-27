USE AMS_Airbnb_Pricing;

-- Insert distinct room types
INSERT INTO roomType (room_type)
SELECT DISTINCT room_type
FROM denormalised_ams_data;

-- Insert distinct day types
INSERT INTO dayType (day_type)
VALUES ('weekdays'), ('weekends')
ON DUPLICATE KEY UPDATE day_type = VALUES(day_type);

-- Insert distinct rating categories
INSERT INTO ratingCategory (rating_category)
SELECT DISTINCT rating_category
FROM denormalised_ams_data;

-- Insert listings data
INSERT INTO listings (capacity, num_of_bedrooms, is_super_host, room_type_id)
SELECT
    l.capacity,
    l.num_of_bedrooms,
    l.is_super_host,
    rt.room_type_id
FROM pivot_listings l
JOIN roomType rt ON rt.room_type = l.room_type;

-- Insert prices data
INSERT INTO prices (real_sum, listing_id, day_type)
SELECT
    p.realSum,
    l.listing_id,
    p.day_type
FROM pivot_prices p
JOIN listings l ON p.capacity = l.capacity
    AND p.num_of_bedrooms = l.num_of_bedrooms
    AND p.is_super_host = l.is_super_host
    AND l.room_type_id = (SELECT room_type_id FROM roomType WHERE room_type = p.room_type)
JOIN dayType dt ON p.day_type = dt.day_type;

-- Insert reviews data using the new pivot table
INSERT INTO reviews (guest_satisfaction_score, listing_id, rating_cat_id)
SELECT
    r.guest_satisfaction_score,
    l.listing_id,
    rc.rating_cat_id
FROM pivot_reviews r
JOIN listings l ON r.capacity = l.capacity
    AND r.num_of_bedrooms = l.num_of_bedrooms
    AND r.is_super_host = l.is_super_host
    AND l.room_type_id = (SELECT room_type_id FROM roomType WHERE room_type = r.room_type)
JOIN ratingCategory rc ON r.rating_category = rc.rating_category;

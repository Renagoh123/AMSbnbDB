-- Research Question 1: Establish a foundational understanding of the Airbnb market composition in Amsterdam. 

-- counts the total number of listings
SELECT COUNT(*) AS total_listings FROM listings;

-- counts the number of listings for each room type
  SELECT rt.room_type, COUNT(listings.listing_id) AS count
  FROM listings
  JOIN roomType rt ON listings.room_type_id = rt.room_type_id
  GROUP BY rt.room_type;


-- Research Question 2: Assessing how superhost status may affect the pricing strategies, understanding competitive dynamics in the market. 

-- get the average price of listings for superhost and non-superhost
SELECT 
    ROUND(AVG(prices.real_sum),0) AS avg_price, 
    listings.is_super_host 
FROM prices
JOIN listings ON prices.listing_id = listings.listing_id
GROUP BY listings.is_super_host;

-- Research Question 3: How do Factors Influence Guest Overall Satisfaction in Amsterdam's Airbnb Market?
-- Research Question 3a: Explore the impact of superhost status on guest satisfaction, a key metric for guest demand.

-- get the average satisfaction scores for Superhost vs. Non-superhost
SELECT
        ROUND(AVG(reviews.guest_satisfaction_score),2) AS avgScore,
        listings.is_super_host
    FROM reviews
    JOIN listings ON reviews.listing_id = listings.listing_id
    GROUP BY listings.is_super_host;

-- Research Question 3b: Examine whether the size of the listing (capacity) has higher satisfaction scores, which could influence listing management strategies. 

-- get the average guest satisfaction score for different person capacities of listings.
    SELECT 
      ROUND(AVG(reviews.guest_satisfaction_score), 2) AS avgScore, 
      listings.capacity
    FROM reviews
    JOIN listings ON reviews.listing_id = listings.listing_id
    GROUP BY listings.capacity
    ORDER BY listings.capacity;

-- Research Question 3c: Investigates if pricing strategies related to day types affect guest satisfaction

-- get the average prices of listings for weekdays and weekends and the corresponding satisfaction level (rating_category)
SELECT
      p.day_type,
      r.rating_category,
      AVG(p.realSum) AS avg_price
    FROM pivot_prices p
    JOIN pivot_reviews r 
    ON p.capacity = r.capacity AND
       p.num_of_bedrooms = r.num_of_bedrooms AND
       p.is_super_host = r.is_super_host AND
       p.room_type = r.room_type
    GROUP BY p.day_type, r.rating_category
    ORDER BY p.day_type, r.rating_category;
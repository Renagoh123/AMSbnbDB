// question3c.js - Contains the helper function and SQL query logic for the 3c research question.
const db = require('./db');

/**
 * @desc Retrieves the average prices of listings for weekdays and weekends, along with the corresponding satisfaction level (rating_category)
 *
 * @returns {Promise<Object>} A promise that resolves to an object containing:
 *                            - ratingCategories: An array of rating categories.
 *                            - weekdays: An array of average prices for weekdays.
 *                            - weekends: An array of average prices for weekends.
 */

function getPricingSatisfaction() {
  // query to get average pricing of listings for weekdays and weekends 
  // and the corresponding rating categories
  const queryPricingSatisfaction = `
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
  `;

  return new Promise((resolve, reject) => {
    // execute the query
    db.query(queryPricingSatisfaction, (error, pricingResults) => {
      if (error) return reject(error);

      // predefined rating categories
      const allCategories = ['Neutral', 'Satisfied', 'Very Dissatisfied', 'Very Satisfied', 'Dissatisfied'];

      // initialize an object to store the result
      const data = {
        ratingCategories: allCategories,
        weekdays: {},
        weekends: {}
      };

      // iterating over the results to assign prices to the appropriate day type and category
      pricingResults.forEach(result => {
        const category = result.rating_category;

        if (result.day_type === 'weekdays') {
          data.weekdays[category] = result.avg_price;
        } else {
          data.weekends[category] = result.avg_price;
        }
      });

      // create arrays for weekdays and weekends data in the order of ratingCategories
      const weekdaysData = data.ratingCategories.map(category => data.weekdays[category]);
      const weekendsData = data.ratingCategories.map(category => data.weekends[category]);

      // resolve the promise with the result
      resolve({
        ratingCategories: data.ratingCategories,
        weekdays: weekdaysData,
        weekends: weekendsData
      });
    });
  });
}

module.exports = { getPricingSatisfaction };

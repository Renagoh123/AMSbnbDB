// question3b.js - Contains the helper function and SQL query logic for the 3b research question.
const db = require('./db');

/**
 * @desc Retrieves the average guest satisfaction score for different person capacities of listings.
 *
 * @returns {Promise<Object>} A promise that resolves to an object containing:
 *                            - data: An array of objects representing the average guest satisfaction score for each capacity.
 *                            - maxSatisfactionByCapcity: The maximum average guest satisfaction score across all capacities.
 */

function getCapacitySatisfaction() {
  // query to get the average satisfaction for each person capacity of listings
  const queryCapacitySatisfaction = `
    SELECT 
      ROUND(AVG(reviews.guest_satisfaction_score), 2) AS avgScore, 
      listings.capacity
    FROM reviews
    JOIN listings ON reviews.listing_id = listings.listing_id
    GROUP BY listings.capacity
    ORDER BY listings.capacity;
  `;

  return new Promise((resolve, reject) => {
    // execute the query
    db.query(queryCapacitySatisfaction, (error, results) => {
      if (error) return reject(error);

      // map the results to an array of objects
      const data = results.map(row => ({
        capacity: row.capacity,
        avgScore: row.avgScore
      }));

      // find which capacity get maximum average score
      const maxSatisfactionByCapcity = data.reduce((max, item) => item.avgScore > max.avgScore ? item : max, { avgScore: 0 });

      // resolve the promise with the result
      resolve({
        data: data,
        maxSatisfactionByCapcity: maxSatisfactionByCapcity
      });
    });
  });
}

module.exports = { getCapacitySatisfaction };

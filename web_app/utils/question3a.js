//question3a.js - Contains the helper function and SQL query logic for the 3a research question.
const db = require('./db');

/**
 * @desc Retrieves the overall guest satisfaction score for superhost and non-superhost listings.
 *
 * @returns {Promise<Object>} A promise that resolves to an object containing:
 *                            - superhostSatisfaction: The average guest satisfaction score for superhost listings.
 *                            - nonSuperhostSatisfaction: The average guest satisfaction score for non-superhost listings.
 */

function getSatisfactionByHost() {
  // query to get the overall satisfaction for superhost and non-superhost
  const queryHostSatisfaction = `
    SELECT
        ROUND(AVG(reviews.guest_satisfaction_score),2) AS avgScore,
        listings.is_super_host
    FROM reviews
    JOIN listings ON reviews.listing_id = listings.listing_id
    GROUP BY listings.is_super_host;
  `;

  return new Promise((resolve, reject) => {
    // execute the query
    db.query(queryHostSatisfaction, (error, satisfactionResults) => {
      if (error) return reject(error);

      // initialize variables to store the average satisfaction scores
      let superhostSatisfaction = 0;
      let nonSuperhostSatisfaction = 0;

      // iterate over the query results to separate superhost and non-superhost satisfaction
      satisfactionResults.forEach(result => {
        if (result.is_super_host) {
          superhostSatisfaction = result.avgScore;
        } else {
          nonSuperhostSatisfaction = result.avgScore;
        }
      });

      // resolve the promise with the result
      resolve({
        superhostSatisfaction: superhostSatisfaction,
        nonSuperhostSatisfaction: nonSuperhostSatisfaction
      });
    });
  });
}

module.exports = { getSatisfactionByHost };

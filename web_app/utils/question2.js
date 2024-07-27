// question2.js - Contains the helper function and SQL query logic for the second research question.
const db = require('./db');

/**
 * @desc Retrieves the average pricing of listings for superhost and non-superhost.
 *
 * @returns {Promise<Object>} A promise that resolves to an object containing:
 *                            - superhostAvgPrice: The average price of superhost listings.
 *                            - nonSuperhostAvgPrice: The average price of non-superhost listings.
*/

function getHostPricing() {
  // sql: get the average price of listings for superhost and non-superhost
  const queryHostPricing = `
    SELECT 
      ROUND(AVG(prices.real_sum),0) AS avg_price, 
      listings.is_super_host 
    FROM prices
    JOIN listings ON prices.listing_id = listings.listing_id
    GROUP BY listings.is_super_host;
  `;

  return new Promise((resolve, reject) => {
    // execute the query
    db.query(queryHostPricing, (error, priceResult) => {
      if (error) return reject(error);

      // initialize variables to store the average prices 
      let priceForSuperhost = 0;
      let priceForNonSuperHost = 0;

      // iterate over the query results to separate superhost and non-superhost prices
      priceResult.forEach(result => {
        if (result.is_super_host) {
          priceForSuperhost = result.avg_price;
        } else {
          priceForNonSuperHost = result.avg_price;
        }
      });
      // resolve the promise with the result
      resolve({
        superhostAvgPrice: priceForSuperhost,
        nonSuperhostAvgPrice: priceForNonSuperHost
      });
    });
  });
}

module.exports = { getHostPricing };
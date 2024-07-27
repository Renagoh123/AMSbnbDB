// question1.js - Contains the helper function and SQL query logic for the first research question.
const db = require('./db');
/**
 * @desc Retrieves the total number of listings and the count of listings for each room type from the database.
 *
 * @returns {Promise<Object>} A promise that resolves to an object containing:
 *                            - totalListings: The total number of listings.
 *                            - roomTypes: An array of objects representing the count of listings for each room type.
 */
 
function getTotalListings() {
  // sql: counts the total number of listings
  const queryTotalListings = 'SELECT COUNT(*) AS total_listings FROM listings;';
  // sql: counts the number of listings for each room type
  const queryNumOfRoomType= `
    SELECT rt.room_type, COUNT(listings.listing_id) AS count
    FROM listings
    JOIN roomType rt ON listings.room_type_id = rt.room_type_id
    GROUP BY rt.room_type;
  `;

  return new Promise((resolve, reject) => {
    // execute the query to count total listings
    db.query(queryTotalListings, (error, totalListings) => {
      if (error) return reject(error);
      // execute the query to count listings by room type
      db.query(queryNumOfRoomType, (error, roomTypeCount) => {
        if (error) return reject(new Error('Error executing queryNumOfRoomType: ' + error.message));
        // resolve the promise with the result for both queries
        resolve({
          totalListings: totalListings[0].total_listings,
          roomType: roomTypeCount
        });
      });
    });
  });
}

module.exports = { getTotalListings };


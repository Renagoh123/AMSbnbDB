// Import necessary modules and utilities
const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const env = require('dotenv').config();
const db = require('./utils/db');

// Import the functions for each research question
const { getTotalListings } = require('./utils/question1');
const { getHostPricing } = require('./utils/question2');
const { getSatisfactionByHost } = require('./utils/question3a');
const { getCapacitySatisfaction } = require('./utils/question3b');
const {getPricingSatisfaction} = require('./utils/question3c');

// Initialize the Express app
const app = express();
const port = 3000;

// Set up Mustache as the template engine
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', './templates');
// Use body-parser to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
// Serve static files from the 'public' directory
app.use(express.static('public')); 

// Define the route for the homepage
app.get('/', async (req, res) => {
    try {
        // Fetch data for each research question
        const q1 = await getTotalListings();
        const q2 = await getHostPricing();
        const q3a = await getSatisfactionByHost();
        const q3b = await getCapacitySatisfaction();
        const q3c = await getPricingSatisfaction();   

        // Render the 'index' template with the fetched data
        res.render('index', {
            // data for question 1
            totalListings: q1.totalListings,
            roomType: q1.roomType,
            // data for question 2
            superhostAvgPrice: q2.superhostAvgPrice,
            nonSuperhostAvgPrice: q2.nonSuperhostAvgPrice,
            // data for question 3a
            superhostSatisfaction: q3a.superhostSatisfaction,
            nonSuperhostSatisfaction: q3a.nonSuperhostSatisfaction,
            // data for question 3b
            capacitySatisfaction: q3b.data,
            maxSatisfactionByCapcity: q3b.maxSatisfactionByCapcity,
            // data for question 3c
            ratingCategories: JSON.stringify(q3c.ratingCategories),
            weekdays: JSON.stringify(q3c.weekdays),
            weekends: JSON.stringify(q3c.weekends),
        });
    } catch (error) {
        // handle any errors that occur during data fetching
        console.error('Error in route handler:', error.message);
        res.status(500).send('Error fetching data: ' + error.message);
    }
});

// Start the Express app on the specified port
app.listen(port, function () {
    console.log('The app is listening at http://localhost:' + port + '.');
})
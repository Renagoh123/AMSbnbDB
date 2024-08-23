# Airbnb Pricing Analysis for Amsterdam
This project focuses on database implementation for analyzing Airbnb pricing in Amsterdam. It involves building an ER model for the data structure, implementing a relational database in MySQL, and inserting data. The web application simply displays data related to research questions using SQL queries to retrieve the data.

## Installation

To set up the project locally, follow these steps:

1. **Install dependencies**
    ```bash
    npm install express mysql body-parser mustache-express dotenv chart.js
    ```

2. **Create a `.env` file** in the root directory and add your MySQL database credentials:
    ```plaintext
    DB_HOST=your_database_host
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    DB_NAME=your_database_name
    ```

3. **Set up the database**: Ensure you have a MySQL database running and configured with the necessary tables and data.

4. **Start the server**:
    ```bash
    npm start
    ```
    Access the app at [http://localhost:3000](http://localhost:3000)


## Project Structure

- `server.js`: The main server file that initializes the Express server and sets up routes.
- `routes/`: Directory containing route handlers.
- `views/`: Directory containing Mustache templates for rendering HTML.
- `public/`: Directory containing static files (CSS, JS, images).
- `db/`: Directory containing database configuration and queries.

## Dependencies
- **express**: ^4.17.1
- **mysql**: ^2.18.1
- **body-parser**: ^1.19.0
- **mustache-express**: ^1.3.0
- **dotenv**: ^8.2.0
- **chart.js**: ^3.7.1

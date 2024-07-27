-- drop existing database (if it exists) and create new database
DROP DATABASE IF EXISTS AMS_Airbnb_Pricing;
CREATE DATABASE AMS_Airbnb_Pricing;

-- drop existing user (if it exists) and create new user
DROP USER IF EXISTS 'studb'@'%';
CREATE USER 'studb'@'%' IDENTIFIED WITH mysql_native_password BY '10233189';

-- grant user permission to access the project
GRANT ALL ON AMS_Airbnb_Pricing.* TO 'studb'@'%';

-- grant additional permissions to run mysql on Colab
GRANT SELECT ON mysql.* TO 'studb'@'%';




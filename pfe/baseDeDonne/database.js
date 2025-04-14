const { configDotenv } = require('dotenv');
const { Client } = require('pg');
require('dotenv').config(); // Load environment variables

const client = new Client({
    user:  'postgres',
    host:  'localhost',
    database: 'gestion_departement',
    password:  '0772442555amina',
    port:  5432,
});



client.connect()
    .then(() => console.log(" Database connected successfully"))
    .catch(err => console.error(" Database connection error:", err.message));

module.exports = client;



//create user
//create departement
//get all users
//get all departements
//get user by id
//get departement by id
//update user by id
//update departement by id
//delete user by id
//delete departement by id






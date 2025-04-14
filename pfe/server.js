const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoute'); // ✅ nom exact du fichier
const studentRoutes = require('./routes/studentRoute'); // Adjust if necessary
const sectionRoutes = require('./routes/sectionRoute'); // Adjust if necessary
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
});
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const { Pool } = require('pg');

// Middleware
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: 'localhost',
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

app.set('trust proxy', 1); // trust first proxy

app.use(session({
  store: new pgSession({
    pool: pool, // Connection pool
    tableName: 'session', // Use the table we created earlier
  }),
  secret: '1234567890',
  name: "sid",
  saveUninitialized: false,
	resave: true,
	unset: 'destroy',
	cookie: {
		httpOnly: true,
		maxAge: 604800000, // 7 days
	},
}))

// Routes
app.use('/api/users', userRoutes);

// Sync the database before starting the server
sequelize.sync()
  .then(() => {
    console.log('Database synced successfully.');

    // Start the server after syncing the database
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log( 'Server is running on http://localhost:3000');
    });
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });
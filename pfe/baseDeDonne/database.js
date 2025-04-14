require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: Number(process.env.DB_PORT),
    logging: false, // désactive les logs SQL dans la console
  }
);

// Test de connexion
sequelize.authenticate()
  .then(() => console.log('✅ Connexion à la base réussie'))
  .catch(err => console.error('❌ Erreur de connexion à la base :', err.message));

module.exports = sequelize;



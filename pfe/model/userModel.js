const { DataTypes } = require('sequelize');
const sequelize = require('../baseDeDonne/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: true
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  role: {
    type: DataTypes.ENUM('Admin', 'Teacher', 'Student', 'agent'), 
    allowNull: true // or false depending on your needs
  },
  motdepasse: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  timestamps: false,
  freezeTableName: true,  // This ensures the table name is exactly 'users'
  tableName: 'users'      // Explicitly set the table name as 'users'
});

module.exports = User;

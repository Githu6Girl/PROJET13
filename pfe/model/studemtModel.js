const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});



client.connect();

// Modèle pour ajouter un étudiant
const addStudent = async (studentData) => {
  const { matricule, nom, prenom, dateNaissance, sexe, nationalite, handicap, email, telephone, observation } = studentData;
  const query = `INSERT INTO etudiants (matricule, nom, prenom, dateNaissance, sexe, nationalite, handicap, email, telephone, observation)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;
  try {
    const result = await client.query(query, [matricule, nom, prenom, dateNaissance, sexe, nationalite, handicap, email, telephone, observation]);
    return result.rows[0];
  } catch (err) {
    throw new Error(err.message);
  }
};

// Modèle pour récupérer tous les étudiants
const getAllStudents = async () => {
  const query = 'SELECT * FROM etudiants';
  try {
    const result = await client.query(query);
    return result.rows;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Modèle pour récupérer un étudiant par ID
const getStudentById = async (id) => {
  const query = 'SELECT * FROM etudiants WHERE id = $1';
  try {
    const result = await client.query(query, [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Modèle pour mettre à jour un étudiant
const updateStudent = async (id, studentData) => {
  const { matricule, nom, prenom, dateNaissance, sexe, nationalite, handicap, email, telephone, observation } = studentData;
  const query = `UPDATE etudiants SET matricule = $1, nom = $2, prenom = $3, dateNaissance = $4, sexe = $5, nationalite = $6, handicap = $7, email = $8, telephone = $9, observation = $10
    WHERE id = $11 RETURNING *`;
  try {

    const result = await client.query(query, [matricule, nom, prenom, dateNaissance, sexe, nationalite, handicap, email, telephone, observation, id]);
    return result.rows[0];
  } catch (err) {
    throw new Error(err.message);
  }
};

// Modèle pour supprimer un étudiant
const deleteStudent = async (id) => {
  const query = 'DELETE FROM etudiants WHERE id = $1 RETURNING *';
  try {
    const result = await client.query(query, [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { addStudent, getAllStudents, getStudentById, updateStudent, deleteStudent };
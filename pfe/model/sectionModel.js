const { DataTypes } = require('sequelize');
const sequelize = require('../baseDeDonne/database');

// Ajouter une section

const addSection = async (sectionData) => {
  const { nom, niveau, specialite, numeroSection } = sectionData;
  const queryText = 
    `INSERT INTO sections (nom, niveau, specialite, numeroSection)
    VALUES ($1, $2, $3, $4) RETURNING *`;

  const params = [nom, niveau, specialite, numeroSection];

  try {
    const result = await db.query(queryText, params);
    return result[0];  // Retourne la section ajoutée
  } catch (err) {
    throw new Error('Erreur lors de l\'ajout de la section : ' + err.message);
  }
};

// Récupérer toutes les sections
const getAllSections = async () => {
  const queryText = 'SELECT * FROM sections';
  try {
    const result = await db.query(queryText);
    return result;  // Retourne toutes les sections
  } catch (err) {
    throw new Error('Erreur lors de la récupération des sections : ' + err.message);
  }
};

// Récupérer une section par ID
const getSectionById = async (id) => {
  const queryText = 'SELECT * FROM sections WHERE id = $1';
  try {
    const result = await db.query(queryText, [id]);
    return result.length > 0 ? result[0] : null;  // Retourne la section ou null si non trouvée
  } catch (err) {
    throw new Error('Erreur lors de la récupération de la section : ' + err.message);
  }
};

// Mettre à jour une section
const updateSection = async (id, sectionData) => {
  const { nom, niveau, specialite, numeroSection } = sectionData;
  const queryText = 
    `UPDATE sections SET nom = $1, niveau = $2, specialite = $3, numeroSection = $4
    WHERE id = $5 RETURNING *`;

  const params = [nom, niveau, specialite, numeroSection, id];

  try {
    const result = await db.query(queryText, params);
    return result[0];  // Retourne la section mise à jour
  } catch (err) {
    throw new Error('Erreur lors de la mise à jour de la section : ' + err.message);
  }
};

// Supprimer une section
const deleteSection = async (id) => {
  const queryText = 'DELETE FROM sections WHERE id = $1 RETURNING *';
  try {
    const result = await db.query(queryText, [id]);
    return result.length > 0 ? result[0] : null;  // Retourne la section supprimée
  } catch (err) {
    throw new Error('Erreur lors de la suppression de la section : ' + err.message);
  }
};

module.exports = { addSection, getAllSections, getSectionById, updateSection, deleteSection };
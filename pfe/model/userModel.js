const pool = require('../baseDeDonne/database'); 

const bcrypt = require('bcrypt');

// GET all users
const getAllUsers = async () => {
    const result = await pool.query('SELECT * FROM users ORDER BY id');
    return result.rows;
};

// GET one user
const getUserById = async (id) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
};

// CREATE user
const createUser = async ({ nom, prenom, email, password, role, ref_id }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
        `INSERT INTO users (nom, prenom, email, password, role, ref_id)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [nom, prenom, email, hashedPassword, role, ref_id]
    );
    return result.rows[0];
};

// UPDATE user
const updateUser = async (id, { nom, prenom, email, role, ref_id }) => {
    const result = await pool.query(
        `UPDATE users
         SET nom = $1, prenom = $2, email = $3, role = $4, ref_id = $5
         WHERE id = $6
         RETURNING *`,
        [nom, prenom, email, role, ref_id, id]
    );
    return result.rows[0];
};

// DELETE user
const deleteUser = async (id) => {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};

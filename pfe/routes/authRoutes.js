const express = require('express');
const bcrypt = require('bcrypt');
const client = require('../baseDeDonne/database');

const router = express.Router();

// ✅ Inscription
router.post("/register", async (req, res) => {
    try {
        const {
            nom, prenom, sexe, datenaissance, nationalite,
            matricule, handicap, email, telephone, observation, motdepasse
        } = req.body;

        const userCheckQuery = `
            SELECT * FROM users WHERE email = $1 OR matricule = $2
        `;
        const userResult = await client.query(userCheckQuery, [email.toLowerCase(), matricule]);

        if (userResult.rows.length > 0) {
            return res.status(400).send("Email ou matricule déjà utilisé.");
        }

        const hashedmotdepasse = await bcrypt.hash(motdepasse, 10);

        const insertUserQuery = `
            INSERT INTO users (nom, prenom, sexe, datenaissance, nationalite, matricule, handicap, email, telephone, observation, motdepasse)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `;
        await client.query(insertUserQuery, [nom, prenom, sexe, datenaissance, nationalite,
            matricule, handicap, email.toLowerCase(), telephone, observation, hashedmotdepasse]);

        res.status(201).send("Inscription réussie !");
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

// ✅ Connexion
router.post("/login", async (req, res) => {
    try {
        const { email, matricule, motdepasse } = req.body;

        const query = `
            SELECT * FROM users WHERE email = $1 OR matricule = $2
        `;
        const result = await client.query(query, [email.toLowerCase(), matricule]);

        if (result.rows.length === 0) {
            return res.status(400).send("Email ou matricule incorrect !");
        }

        const user = result.rows[0];
        const match = await bcrypt.compare(motdepasse, user.motdepasse);

        if (match) {
            res.status(200).send("Connexion réussie !");
        } else {
            res.status(400).send("Mot de passe incorrect !");
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;

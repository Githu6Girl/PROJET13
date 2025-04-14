const express = require('express'); // Import d'Express
const router = express.Router();    // Création d'un routeur
const userController = require('../controllers/userController'); // Import du contrôleur
const authController = require('../controllers/authController'); // Import du contrôleur
const { getGrant } = require('../tools/getGrant');

// Route pour créer un utilisateur
router.route('/')
    .post([getGrant(["Admin","Teacher"])],userController.createUser)
    .get([getGrant(["Teacher","Admin"])],userController.getUsers);

// Route pour mettre à jour un utilisateur par ID
router.put('/:id(\\d+)',userController.updateUser);

// Route pour supprimer un utilisateur par ID
router.delete('/:id(\\d+)', userController.deleteUser);

router.route("/login").post(authController.login);

router.route("/logout").post(authController.logout);

router.route("/current").get([getGrant(["Admin","Teacher","Student","agent"])], authController.currentUser);

module.exports = router; // Exportation du routeur pour l’utilisate


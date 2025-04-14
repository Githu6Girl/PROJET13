const User = require('../model/userModel'); // On importe le modèle User

// Création d'un nouvel utilisateur
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body); // Création à partir du corps de la requête
    res.status(201).json(user);               // Réponse avec l'objet créé
  } catch (err) {
    res.status(400).json({ error: err.message }); // En cas d’erreur, on renvoie le message
  }
};

// Récupérer tous les utilisateurs
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // Récupère tous les enregistrements
    res.json(users);                    // Renvoie la liste des utilisateurs
  } catch (err) {
    res.status(500).json({ error: err.message }); // Erreur serveur
  }
};

// Mettre à jour un utilisateur avec son ID
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id); // Cherche l'utilisateur par ID
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    await user.update(req.body); // Met à jour avec les nouvelles données
    res.json(user);              // Renvoie l'objet mis à jour
  } catch (err) {
    res.status(400).json({ error: err.message }); // Erreur de validation ou autre
  }
};

// Supprimer un utilisateur avec son ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id); // Cherche l'utilisateur
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    await user.destroy();        // Supprime du système
    res.json({ message: 'Utilisateur supprimé' }); // Message de succès
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
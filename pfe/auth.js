const express = require('express');
const bcrypt = require('bcrypt');
const client = require('./baseDeDonne/database'); 

const app = express();
const port = 5050;

// Temp DB en mémoire
const users = [];

app.use(express.json());

// ✅ Inscription Étudiant
app.post("/register", async (req, res) => {
    try {
      const {
        nom, prenom, sexe, dateNaissance, nationalite,
        matricule, filiere, email, telephone, password
      } = req.body;
  
      const findUser = users.find(
        (user) => user.email === email || user.matricule === matricule
      );
      if (findUser) {
        return res.status(400).send("Une erreur est survenue. Veuillez vérifier vos données et réessayer!");
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      users.push({
        nom, prenom, sexe, dateNaissance, nationalite,
        matricule, filiere, email, telephone,
        password: hashedPassword,
        role: 'etudiant'
      });
  
      
      console.log(users); // debug
      res.status(201).send("Inscription réussie !");
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  });
  
  // ✅ Connexion par email
  app.post("/login/email", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = users.find((u) => u.email === email);
      if (!user) {
        return res.status(400).send("Email incorrect !");
      }
  
      const match = await bcrypt.compare(password, user.password);
      match
        ? res.status(200).send("Connection réussie ")
        : res.status(400).send("Mot de passe ou email incorrect !");
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  });
  
  // ✅ Connexion par matricule
  app.post("/login/matricule", async (req, res) => {
    try {
      const { matricule, password } = req.body;
  
      const user = users.find((u) => u.matricule === matricule);
      if (!user) {
        return res.status(400).send("Matricule incorrect !");
      }
  
      const match = await bcrypt.compare(password, user.password);
      match
        ? res.status(200).send("Connection réussie ")
        : res.status(400).send("Mot de passe ou matricule incorrect !");
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  });
  
  app.listen(port, () => {
    console.log("✅ Serveur lancé sur le port", port);
  });
  
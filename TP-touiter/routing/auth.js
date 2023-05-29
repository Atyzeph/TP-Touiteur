const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db.json');

// Page de connexion
router.get('/', (req, res) => {
  res.render('login');
});

// Soumission du formulaire de connexion
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Recherche de l'utilisateur dans la base de données
  const user = db.users.find(u => u.username === username);

  if (!user) {
    // Utilisateur non trouvé
    res.render('login', { error: 'Nom d\'utilisateur ou mot de passe incorrect' });
    return;
  }

  // Vérification du mot de passe
  if (password !== user.password) {
    // Mot de passe incorrect
    res.render('login', { error: 'Nom d\'utilisateur ou mot de passe incorrect' });
    return;
  }
  req.session.userId = user.id;
  // Connexion réussie, rediriger vers la page d'accueil
  res.redirect('/homePage');
});

// Route pour la page d'inscription
router.get('/register', (req, res) => {
  res.render('register');
});

// Soumission du formulaire d'inscription
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Vérification si l'utilisateur existe déjà dans la base de données
  const existingUser = db.users.find(u => u.username === username);

  if (existingUser) {
    // Utilisateur déjà existant
    res.render('register', { error: 'Le nom d\'utilisateur est déjà pris' });
    return;
  }

  // Génération d'un nouvel ID unique pour l'utilisateur
  const userId = uuidv4();

  // Création du nouvel utilisateur
  const newUser = {
    id: userId,
    username: username,
    password: password
  };

  // Ajout du nouvel utilisateur à la base de données
  db.users.push(newUser);

  // Rediriger vers la page de connexion après l'inscription
  res.redirect('/');
});

module.exports = router;

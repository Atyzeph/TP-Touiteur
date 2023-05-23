const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db.json');
const messageController = require('../controllers/messageController');

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

  // Connexion réussie, rediriger vers la page d'accueil par exemple
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

  // Rediriger vers la page de connexion après l'inscription réussie
  res.redirect('/');
});

// Page d'accueil
router.get('/homePage', (req, res) => {
  // Récupérer les messages en utilisant le contrôleur
  const messages = messageController.getMessages();

  // Passer les messages à la vue et rendre la page d'accueil
  res.render('homePage', { messages });
});

// Soumission du formulaire de création de message
router.post('/createMessage', (req, res) => {
  const { messageContent } = req.body;
  const userId = req.session.userId; // Utilisez le bon moyen pour récupérer l'ID de l'utilisateur

  messageController.createMessage(messageContent, userId)
    .then((newMessage) => {
      if (newMessage) {
        res.redirect('/homePage');
      } else {
        res.redirect('/homePage'); // Rediriger vers la page d'accueil en cas d'erreur
      }
    })
    .catch(error => {
      console.error('Error creating message:', error);
      res.redirect('/homePage'); // Rediriger vers la page d'accueil en cas d'erreur
    });
});

module.exports = router;

const express = require('express');
const app = express();
const port = 3000;
const authRoutes = require('./routing/auth');
const homeRoutes = require('./routing/home');
const router = express.Router();
const session = require('express-session');
const config = require('./config');

app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Session
app.use(session({
  // Fichier config
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false
}));

// Route de déconnexion
app.get('/logout', (req, res) => {
  // Détruire la session de l'utilisateur (destroy)
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/');
  });
});


// Routes ...
app.use(authRoutes);
app.use(homeRoutes);


app.listen(port, () => {
  console.log(`Le serveur est en écoute sur le port ${port}`);
});

// Création de message
router.post('/createMessage', async (req, res) => {
    const { messageContent } = req.body;
  
    try {
      await createMessage(messageContent);
      res.redirect('/homePage');
    } catch (error) {
      console.error('Error creating message:', error);
      res.redirect('/homePage');
    }
});
  

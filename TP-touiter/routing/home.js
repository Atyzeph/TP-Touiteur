const express = require('express');
const { getMessages } = require('../controllers/messageController');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Afficher la page d'accueil
router.get('/homePage', async (req, res) => {
    try {
      const messages = await getMessages();
      res.render('homePage', { messages: messages });
    } catch (error) {
      console.error('Error retrieving messages:', error);
      res.render('homePage', { messages: [] });
    }
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
    const userId = req.session.userId; 
    console.log("UserId : " + userId);
    messageController.createMessage(messageContent, userId)
      .then(() => {
        res.redirect('/homePage');
      })
      .catch(error => {
        console.error('Error creating message:', error);
        res.redirect('/homePage');
      });
  });

module.exports = router;

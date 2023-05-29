const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Afficher la page d'accueil
router.get('/homePage', async (req, res) => {
  try {
    const messages = await messageController.getMessages();
    res.render('homePage', { messages });
  } catch (error) {
    console.error('Error retrieving messages:', error);
    res.render('homePage', { messages: [] });
  }
});

// Soumission du formulaire de création de message
router.post('/createMessage', (req, res) => {
  const { messageContent } = req.body;
  const userId = req.session.userId;
  messageController.createMessage(messageContent, userId)
    .then(() => {
      res.redirect('/homePage');
    })
    .catch(error => {
      console.error('Error creating message:', error);
      res.redirect('/homePage');
    });
});

// Suppression d'un message
router.post('/deleteMessage', (req, res) => {
  const { messageId } = req.body;
  const success = messageController.deleteMessageById(parseInt(messageId));
  if (success) {
    res.redirect('/homePage');
  } else {
    res.redirect('/homePage');
  }
});


module.exports = router;

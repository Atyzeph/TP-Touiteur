const express = require('express');
const { getMessages } = require('../controllers/messageController');
const router = express.Router();

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
  
module.exports = router;

const db = require('../db.json');

// Récupérer les messages
function getMessages() {
  const messages = db.messages.map(msg => {
    const user = db.users.find(u => u.id === msg.user.id);
    return { ...msg, user };
  });
  
  return messages;
}

let messageId = 3; // Variable pour stocker l'identifiant du message

async function createMessage(messageContent, userId) {
  try {
    const user = db.users.find(u => u.id === userId);
    if (!user) {
      console.error('User not found');
      return null;
    }

    const newMessage = {
      id: messageId, // Utilisation de l'identifiant actuel
      content: messageContent,
      user: {
        id: user.id,
        username: user.username
      }
    };
    messageId++;
    db.messages.push(newMessage);
    return newMessage;
  } catch (error) {
    console.error('Error creating message:', error);
    return null;
  }
}


function deleteMessageById(messageId) {
  const messageIndex = db.messages.findIndex(msg => msg.id === messageId);
  if (messageIndex !== -1) {
    db.messages.splice(messageIndex, 1);
    return true;
  }
  return false;
}


module.exports = {
  getMessages,
  createMessage,
  deleteMessageById
};

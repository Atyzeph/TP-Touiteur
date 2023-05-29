const db = require('../db.json');

// Récupérer les messages
function getMessages() {
  const messages = db.messages.map(msg => {
    const user = db.users.find(u => u.id === msg.user.id);
    return { ...msg, user };
  });
  
  return messages;
}

async function createMessage(messageContent, userId) {
  try {
    const user = db.users.find(u => u.id === userId);
    if (!user) {
      console.error('User not found');
      return null;
    }

    const newMessage = {
      content: messageContent,
      user: {
        id: user.id,
        username: user.username
      }
    };

    db.messages.push(newMessage);
    return newMessage;
  } catch (error) {
    console.error('Error creating message:', error);
    return null;
  }
}

module.exports = {
  getMessages,
  createMessage
};

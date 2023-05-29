// Controller pour l'authentification
const db = require('../db.json');

// Action de connexion
function login(username, password) {
  // Recherche de l'utilisateur dans la base de données
  const user = db.users.find(u => u.username === username && u.id.toString() === userId);
  
  if (!user) {
    // Utilisateur non trouvé
    return { success: false, message: 'Nom d\'utilisateur ou mot de passe incorrect' };
  }

  // Vérification du mot de passe
  if (password !== user.password) {
    // Mot de passe incorrect
    return { success: false, message: 'Nom d\'utilisateur ou mot de passe incorrect' };
  }

  // Connexion réussie
  return { success: true, message: 'Connexion réussie' };
}

// Action d'inscription
function register(username, password) {
  // Vérifie si l'utilisateur existe déjà dans la base de données
  const existingUser = db.users.find(u => u.username === username);

  if (existingUser) {
    // Utilisateur déjà existant
    return { success: false, message: 'Le nom d\'utilisateur est déjà pris' };
  }

  // Création d'un utilisateur
  const newUser = {
    username: username,
    password: password
  };

  // Ajout du nouvel utilisateur à la base de données
  db.users.push(newUser);

  // Inscription réussie
  return { success: true, message: 'Inscription réussie' };
}

module.exports = {
  login,
  register
};

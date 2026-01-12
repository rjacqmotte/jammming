import CryptoJS from 'crypto-js';

// Méthode de hachage MD5 nécessaire pour signer l'authentification Last.fm
export function calculateMD5(text) {
  return CryptoJS.MD5(text).toString();
}

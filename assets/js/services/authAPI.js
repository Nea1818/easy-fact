import axios from "axios";
import jwtDecode from "jwt-decode";

/**
 * Déconnexion (suppression du token du localStorage et sur Axios)
 */
function logout() {
  window.localStorage.removeItem("authToken");
  delete axios.defaults.headers["Authorization"];
}

/**
 * Requête HTTP d'authentification et stockage du token dans storage et axios
 * @param {object} credentials
 */
function authenticate(credentials) {
  return axios
    .post("http://127.0.0.1:8000/api/login_check", credentials)
    .then(response => response.data.token)
    .then(token => {
      // Je stocke le token dans mon localStorage
      window.localStorage.setItem("authToken", token);

      // On prévient Axios qu'on a maintenant un header par défaut sur toutes nos futures requêtes HTTP
      setAxiosToken(token);
    });
}

/**
 * Positionne le token sur axios
 * @param {string} token Le token JWT
 */
function setAxiosToken(token) {
  axios.defaults.headers["Authorization"] = "Bearer " + token;
}

/**
 * Mise en place lors du chargement de l'appli
 */
function setup() {
  // Voir si on a un token?
  const token = window.localStorage.getItem("authToken");
  // Le token est-il encore valide?
  if (token) {
    const { exp: expiration } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      setAxiosToken(token);
    }
  }
}

/**
 * Permet de savoir si on est authentifié
 * @returns boolean
 */
function isAuthenticated() {
  // Voir si on a un token?
  const token = window.localStorage.getItem("authToken");
  // Le token est-il encore valide?
  if (token) {
    const { exp: expiration } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      return true;
    }
    return false;
  }
  return false;
}

export default {
  authenticate,
  logout,
  setup,
  isAuthenticated
};

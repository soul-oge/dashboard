import axios from 'axios';
import { toast } from 'react-toastify';

// Création de l'instance axios
const api = axios.create({
  baseURL: 'http://localhost:4000/users',
  withCredentials: true, // Permet de gérer les cookies pour la session
});

// Ajouter le token dans les headers de chaque requête
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token'); // Récupère le token dans sessionStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Ajoute le token dans les headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Fonction d'enregistrement
export const register = async (data) => {
  try {
    const response = await api.post('/register', data);
    toast.success('Inscription réussie !');
    return response;
  } catch (error) {
    toast.error('Erreur lors de l’inscription');
    throw error;
  }
};

// Fonction de connexion
export const login = async (data) => {
  try {
    const response = await api.post('/signin', data);
    toast.success('Connexion réussie !');
    return response;
  } catch (error) {
    toast.error('Erreur lors de la connexion');
    throw error;
  }
};

// Fonction de déconnexion
export const logout = async () => {
  try {
    const response = await api.get('/logout');
    toast.success('Déconnexion réussie');
    sessionStorage.removeItem('token'); // Supprimer le token de la session à la déconnexion
    return response;
  } catch (error) {
    toast.error('Erreur lors de la déconnexion');
    throw error;
  }
};

// Fonction de récupération du profil
export const getProfile = async () => {
  try {
    const response = await api.get('/me');
    return response;
  } catch (error) {
    toast.error('Impossible de récupérer le profil');
    throw error;
  }
};

// Fonction de mise à jour du profil
export const updateProfile = async (data) => {
  try {
    const response = await api.post('/update-profile', data);
    toast.success('Profil mis à jour');
    return response;
  } catch (error) {
    toast.error('Erreur lors de la mise à jour du profil');
    throw error;
  }
};

// Fonction pour obtenir tous les utilisateurs
export const getAllUsers = async () => {
  try {
    const response = await api.get('/all');
    return response;
  } catch (error) {
    toast.error('Erreur lors de la récupération des utilisateurs');
    throw error;
  }
};

// Fonction pour obtenir un utilisateur par son ID
export const getUserById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response;
  } catch (error) {
    toast.error("Erreur lors de la récupération de l'utilisateur");
    throw error;
  }
};

// Fonction pour supprimer un utilisateur
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    toast.success("Utilisateur supprimé avec succès");
    return response;
  } catch (error) {
    toast.error("Erreur lors de la suppression de l'utilisateur");
    throw error;
  }
};
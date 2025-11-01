// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, logout } from '../api/userApi';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = sessionStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const res = await getProfile();
        setUser(res.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du profil:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Déconnexion
  const handleLogout = async () => {
    try {
      await logout(); 
      sessionStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      alert('Erreur lors de la déconnexion');
    }
  };

  if (loading) return <p>Chargement du profil...</p>;

  if (!user) return <p>Profil non trouvé.</p>;

  return (
    <div>
      <h2>Page d'accueil</h2>
      <p>Bienvenue, {user.username} !</p>
      <p>Email : {user.email}</p>

      {/* Bouton de déconnexion */}
      <button onClick={handleLogout}>Se déconnecter</button>
    </div>
  );
};

export default HomePage;
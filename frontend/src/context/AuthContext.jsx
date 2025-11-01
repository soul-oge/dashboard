
import React, { createContext, useState, useEffect, useContext } from 'react';


export const AuthContext = createContext();


export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:4000/users/me', {
          credentials: 'include', 
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Erreur auth:', err);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  // Fonction pour connecter l'utilisateur manuellement
  const login = (userData) => {
    setUser(userData);
  };

  // Fonction pour déconnecter l'utilisateur
  const logout = async () => {
    try {
      await fetch('http://localhost:4000/users/logout', {
        method: 'GET',
        credentials: 'include',
      });
    } catch (err) {
      console.error('Erreur logout:', err);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

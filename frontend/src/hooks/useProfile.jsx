import { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../api/userApi';

const useProfile = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        const userData = res.data;
        setForm({
          username: userData.username || '',
          email: userData.email || '',
          password: '',
        });
      } catch (err) {
        setError('Erreur de récupération du profil. Veuillez vous reconnecter.');
        console.error('Erreur lors du chargement du profil:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await updateProfile(form);
      alert('Profil mis à jour');
    } catch (err) {
      alert('Erreur lors de la mise à jour');
      console.error(err);
    }
  };

  return { form, loading, error, handleChange, handleUpdate };
};

export default useProfile;
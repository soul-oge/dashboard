import { useNavigate } from 'react-router-dom';
import { logout } from '../api/userApi';

const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      alert('Erreur lors de la déconnexion');
      console.error(err);
    }
  };

  return { handleLogout };
};

export default useLogout;
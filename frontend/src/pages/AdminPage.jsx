import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function AdminPage() {
  const { user } = useContext(AuthContext); 
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '', status: 'user' });
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/users/all');
      setUsers(res.data);
    } catch (err) {
      console.error('Erreur fetch:', err);
    }
  };

  const handleCreate = async () => {
    if (!newUser.username || !newUser.email || !newUser.password) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    try {
      const res = await axios.post('/users/create', newUser);
      setUsers([...users, res.data]);
      setNewUser({ username: '', email: '', password: '', status: 'user' });
    } catch (err) {
      console.error('Erreur create:', err);
    }
  };

  const handleEdit = (user) => {
    setEditUser({ ...user });
  };

  const handleUpdate = async () => {
    if (!editUser.username || !editUser.email) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    
    if (editUser.id === user.id) {
      editUser.status = user.status;
    }
    try {
      await axios.put(`/users/${editUser.id}`, editUser);
      setUsers(users.map((u) => (u.id === editUser.id ? editUser : u)));
      setEditUser(null);
    } catch (err) {
      console.error('Erreur update:', err);
    }
  };

  const handleDelete = async (id) => {
    if (id === user.id) {
      alert("Vous ne pouvez pas supprimer votre propre compte admin !");
      return;
    }
    if (!window.confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) return;
    try {
      await axios.delete(`/users/${id}`);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error('Erreur delete:', err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gestion des utilisateurs</h1>

      {/* Création d'un nouvel utilisateur */}
      <div className="mb-6 border p-4 rounded-md shadow-md">
        <h2 className="font-semibold mb-2">Créer un utilisateur</h2>
        <input
          type="text"
          placeholder="Nom"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          className="border px-2 py-1 mr-2"
        />
        <select
          value={newUser.status}
          onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
          className="border px-2 py-1 mr-2"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button
          onClick={handleCreate}
          className="bg-green-600 text-white px-4 py-1 rounded"
        >
          Créer
        </button>
      </div>

      {/* Tableau des utilisateurs */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Nom</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Rôle</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="text-center">
              <td className="border px-2 py-1">{u.username}</td>
              <td className="border px-2 py-1">{u.email}</td>
              <td className="border px-2 py-1">
                {editUser && editUser.id === u.id ? (
                  <select
                    value={editUser.status}
                    onChange={(e) => setEditUser({ ...editUser, status: e.target.value })}
                    className="border px-1 py-0.5"
                    disabled={u.id === user.id}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  u.status
                )}
              </td>
              <td className="border px-2 py-1 space-x-2">
                {editUser && editUser.id === u.id ? (
                  <>
                    <button
                      onClick={handleUpdate}
                      className="bg-blue-600 text-white px-2 py-1 rounded"
                    >
                      Sauvegarder
                    </button>
                    <button
                      onClick={() => setEditUser(null)}
                      className="bg-gray-400 text-white px-2 py-1 rounded"
                    >
                      Annuler
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(u)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(u.id)}
                      className={`px-2 py-1 rounded ${
                        u.id === user.id ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 text-white'
                      }`}
                      disabled={u.id === user.id} 
                    >
                      Supprimer
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const NavBar: React.FC = () => {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const onLogout = () => {
    logout();
    nav('/login');
  };

  return (
    <nav className="flex justify-between p-4 bg-white shadow">
      <Link to="/" className="font-bold text-lg">Ahorrista</Link>
      {user && (
        <div className="space-x-4">
          <Link to="/">Dashboard</Link>
          <Link to="/goals">Metas</Link>
          <button onClick={onLogout} className="text-red-600">Salir</button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

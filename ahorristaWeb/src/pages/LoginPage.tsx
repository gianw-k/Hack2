import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.includes('@')) return setError('Introduce un email válido');
    if (passwd.length < 12) return setError('Contraseña mínima de 12 caracteres');

    setLoading(true);
    try {
      await login(email, passwd);
      nav('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
            Iniciar Sesión
          </h2>
          {error && (
            <div className="bg-red-100 text-red-800 text-sm p-2 rounded mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={loading}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="usuario@ejemplo.com"
              />
            </div>
            <div>
              <label htmlFor="passwd" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                id="passwd"
                type="password"
                value={passwd}
                onChange={e => setPasswd(e.target.value)}
                disabled={loading}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center py-2 rounded-md text-white font-medium
                ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {loading ? 'Cargando…' : 'Entrar'}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

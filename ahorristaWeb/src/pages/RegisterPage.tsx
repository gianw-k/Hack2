import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function RegisterPage() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.includes('@')) return setError('Email inválido');
    if (passwd.length < 12) return setError('Contraseña mínima de 12 caracteres');
    if (passwd !== confirm) return setError('Las contraseñas no coinciden');

    setLoading(true);
    try {
      await register(email, passwd);
      nav('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
            Crear Cuenta
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
                           focus:outline-none focus:ring-2 focus:ring-green-500"
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
                           focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="••••••••••••"
              />
            </div>
            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-gray-700">
                Repite Contraseña
              </label>
              <input
                id="confirm"
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                disabled={loading}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 
                           focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="••••••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center py-2 rounded-md text-white font-medium
                ${loading ? 'bg-green-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
            >
              {loading ? 'Registrando…' : 'Registrarme'}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
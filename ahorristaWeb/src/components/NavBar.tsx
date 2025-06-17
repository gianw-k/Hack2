import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function NavBar() {
  const { logout, email } = useAuth()
  return (
    <nav className="flex gap-4 p-4 bg-blue-500 text-white">
      <Link to="/" className="font-bold mr-auto">
        Ahorrista
      </Link>
      {email && (
        <>
          <Link to="/goals">Metas</Link>
          <button onClick={logout} className="ml-4 underline">
            Cerrar sesión
          </button>
        </>
      )}
    </nav>
  )
}
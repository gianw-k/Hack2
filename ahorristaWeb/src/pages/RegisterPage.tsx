import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [passwd, setPasswd] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { register } = useAuth()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      await register(email, passwd)
      navigate('/')
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-sm mx-auto space-y-4">
      <h1 className="text-xl font-bold">Registro</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input
        className="border p-2 w-full"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Contraseña (mínimo 12 caracteres)"
        type="password"
        value={passwd}
        onChange={(e) => setPasswd(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2" type="submit">
        Crear cuenta
      </button>
      <p>
        ¿Ya tienes cuenta? <Link to="/login" className="underline">Ingresa</Link>
      </p>
    </form>
  )
}
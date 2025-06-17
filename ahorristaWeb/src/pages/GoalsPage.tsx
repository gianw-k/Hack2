import { useEffect, useState, type FormEvent } from 'react'
import { createGoal, getGoals } from '../api/api'
import { useAuth } from '../hooks/useAuth'
import type { Goal } from '../types'

export default function GoalsPage() {
  const { token } = useAuth()
  const [goals, setGoals] = useState<Goal[]>([])
  const [amount, setAmount] = useState('')
  const [error, setError] = useState<string | null>(null)
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1

  useEffect(() => {
    async function load() {
      if (!token) return
      try {
        setError(null)
        const data = await getGoals(token)
        setGoals(data as Goal[])
      } catch (err) {
        setError((err as Error).message)
      }
    }
    load()
  }, [token])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!token) return
    try {
      setError(null)
      await createGoal(token, { year, month, amount: Number(amount) })
      const data = await getGoals(token)
      setGoals(data as Goal[])
      setAmount('')
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Metas de ahorro</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-x-2 mb-4">
        <input
          className="border p-2"
          placeholder="Monto"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2" type="submit">
          Guardar
        </button>
      </form>
      <ul className="space-y-2">
        {goals.map((g) => (
          <li key={g.id} className="border p-2 flex justify-between">
            <span>
              {g.month}/{g.year}
            </span>
            <span>{g.amount.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
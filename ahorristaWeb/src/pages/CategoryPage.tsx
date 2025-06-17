import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getExpensesDetail } from '../api/api'
import { useAuth } from '../hooks/useAuth'
import type { Expense } from '../types'

export default function CategoryPage() {
  const { id } = useParams()
  const { token } = useAuth()
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [error, setError] = useState<string | null>(null)
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1

  useEffect(() => {
    async function load() {
      if (!token || !id) return
      try {
        setError(null)
        const data = await getExpensesDetail(token, Number(id), year, month)
        setExpenses(data as Expense[])
      } catch (err) {
        setError((err as Error).message)
      }
    }
    load()
  }, [token, id])

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Gastos de la categoría {id}</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {expenses.map((e) => (
          <li key={e.id} className="border p-2 flex justify-between">
            <span>{e.description}</span>
            <span>{e.amount.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
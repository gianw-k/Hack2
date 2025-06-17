import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCategories, getSummary } from '../api/api'
import { useAuth } from '../hooks/useAuth'
import type { Category, SummaryItem } from '../types'

export default function DashboardPage() {
  const { token } = useAuth()
  const [categories, setCategories] = useState<Category[]>([])
  const [summary, setSummary] = useState<SummaryItem[]>([])
  const [error, setError] = useState<string | null>(null)
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1

  useEffect(() => {
    async function load() {
      if (!token) return
      try {
        setError(null)
        const [cats, sum] = await Promise.all([
          getCategories(token),
          getSummary(token, year, month),
        ])
        setCategories(cats as Category[])
        setSummary(sum as SummaryItem[])
      } catch (err) {
        setError((err as Error).message)
      }
    }
    load()
  }, [token])

  const getCategoryName = (id: number) =>
    categories.find((c) => c.id === id)?.name || id.toString()

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Resumen mensual</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {summary.map((item) => (
          <li key={item.categoryId} className="flex justify-between border p-2">
            <span>{getCategoryName(item.categoryId)}</span>
            <span>{item.total.toFixed(2)}</span>
            <Link
              to={`/category/${item.categoryId}`}
              className="text-blue-500 underline ml-2"
            >
              Ver
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';

interface Summary { categoryId: number; categoryName: string; total: number; }

export default function DashboardPage() {
  const [summary, setSummary] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Summary[]>('/expenses_summary')
      .then(res => setSummary(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Resumen Mensual</h1>
      {loading ? (
        <p className="text-center">Cargando resumen…</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {summary.map(cat => (
            <Link
              key={cat.categoryId}
              to={`/category/${cat.categoryId}`}
              className="block bg-white rounded-lg shadow p-4 hover:shadow-lg transition"
            >
              <h2 className="text-lg font-medium">{cat.categoryName}</h2>
              <p className="mt-2 text-2xl font-bold">S/ {cat.total.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

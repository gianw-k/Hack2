import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';

interface Expense {
  id: number;
  date: string;
  description: string;
  amount: number;
}

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const [items, setItems] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [newDesc, setNewDesc] = useState('');
  const [newAmt, setNewAmt] = useState('');

  useEffect(() => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    api.get<Expense[]>(
      `/expenses/detail?year=${year}&month=${month}&categoryId=${id}`
    )
    .then(res => setItems(res.data))
    .finally(() => setLoading(false));
  }, [id]);

  const addExpense = async () => {
    const res = await api.post<Expense>('/expenses', {
      description: newDesc,
      amount: Number(newAmt),
      date: new Date().toISOString().slice(0,10),
      categoryId: Number(id),
    });
    setItems([res.data, ...items]);
    setNewDesc(''); setNewAmt('');
  };

  const delExpense = async (eid: number) => {
    await api.delete(`/expenses/${eid}`);
    setItems(items.filter(x => x.id !== eid));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Detalle de Gastos</h1>

      {/* Nuevo gasto */}
      <div className="bg-white p-4 rounded shadow mb-6 space-y-3">
        <h2 className="font-medium">Agregar Gasto</h2>
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Descripción"
          value={newDesc}
          onChange={e => setNewDesc(e.target.value)}
        />
        <input
          type="number"
          className="w-full border rounded px-3 py-2"
          placeholder="Monto"
          value={newAmt}
          onChange={e => setNewAmt(e.target.value)}
        />
        <button
          onClick={addExpense}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Añadir
        </button>
      </div>

      {/* Lista de gastos */}
      {loading ? (
        <p>Cargando gastos…</p>
      ) : (
        <ul className="space-y-2">
          {items.map(e => (
            <li
              key={e.id}
              className="bg-white p-4 rounded shadow flex justify-between"
            >
              <div>
                <p className="font-medium">{e.description}</p>
                <p className="text-sm text-gray-500">{e.date}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span>S/ {e.amount.toFixed(2)}</span>
                <button
                  onClick={() => delExpense(e.id)}
                  className="text-red-600 hover:underline"
                >
                  Borrar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

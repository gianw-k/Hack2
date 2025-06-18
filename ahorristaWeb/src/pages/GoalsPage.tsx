import { useEffect, useState } from 'react';
import api from '../api/api';

interface Goal {
  id: number;
  title: string;
  targetAmount: number;
  dueDate: string;
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    api.get<Goal[]>('/goals')
      .then(res => setGoals(res.data))
      .finally(() => setLoading(false));
  }, []);

  const createGoal = async () => {
    if (!title || !amount || !dueDate) return;
    const res = await api.post<Goal>('/goals', {
      title,
      targetAmount: Number(amount),
      dueDate,
    });
    setGoals([res.data, ...goals]);
    setTitle(''); setAmount(''); setDueDate('');
  };

      const editGoal = async (g: Goal) => {
    const newTitle = prompt('Nuevo título', g.title) ?? g.title;
    const newAmount = prompt('Nuevo monto', g.targetAmount.toString()) ?? g.targetAmount.toString();
    const newDate = prompt('Nueva fecha (YYYY-MM-DD)', g.dueDate) ?? g.dueDate;

    const res = await api.patch<Goal>(`/goals/${g.id}`, {
      title: newTitle,
      targetAmount: Number(newAmount),
      dueDate: newDate,
    });
    setGoals(goals.map(x => x.id === g.id ? res.data : x));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Metas de Ahorro</h1>

      {/* Formulario crear meta */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-medium mb-4">Nueva Meta</h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="number"
            placeholder="Monto objetivo"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={createGoal}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Crear Meta
          </button>
        </div>
      </div>

      {/* Lista de metas */}
      {loading ? (
        <p>Cargando metas…</p>
      ) : goals.length === 0 ? (
        <p>No tienes metas aún.</p>
      ) : (
        <ul className="space-y-4">
          {goals.map(g => (
            <li
              key={g.id}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-medium">{g.title}</p>
                <p className="text-sm text-gray-600">
                  S/ {g.targetAmount.toFixed(2)} · vence {g.dueDate}
                </p>
              </div>
              <button
                onClick={() => editGoal(g)}
                className="text-blue-600 hover:underline"
              >
                Editar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

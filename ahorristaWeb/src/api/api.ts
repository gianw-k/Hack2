const API_URL = import.meta.env.VITE_API_URL

export interface LoginResponse {
  token: string
  email: string
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string,
): Promise<T> {
  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (token) headers.Authorization = `Bearer ${token}`
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: { ...headers, ...options.headers },
  })
  if (!res.ok) throw new Error(await res.text())
  if (res.status === 204) return null as T
  return res.json() as Promise<T>
}

export function register(email: string, passwd: string) {
  return request('/authentication/register', {
    method: 'POST',
    body: JSON.stringify({ email, passwd }),
  })
}

export function login(email: string, passwd: string) {
  return request<LoginResponse>('/authentication/login', {
    method: 'POST',
    body: JSON.stringify({ email, passwd }),
  })
}

export function getSummary(token: string, year: number, month: number) {
  return request(`/expenses_summary?year=${year}&month=${month}`, {}, token)
}

export function getCategories(token: string) {
  return request('/expenses_category', {}, token)
}

export function getExpensesDetail(
  token: string,
  categoryId: number,
  year: number,
  month: number,
) {
  return request(
    `/expenses/detail?year=${year}&month=${month}&categoryId=${categoryId}`,
    {},
    token,
  )
}

export function createExpense(
  token: string,
  expense: { amount: number; description: string; categoryId: number; date: string },
) {
  return request('/expenses', {
    method: 'POST',
    body: JSON.stringify(expense),
  }, token)
}

export function deleteExpense(token: string, id: number) {
  return request(`/expenses/${id}`, { method: 'DELETE' }, token)
}

export function getGoals(token: string) {
  return request('/goals', {}, token)
}

export function createGoal(
  token: string,
  goal: { year: number; month: number; amount: number },
) {
  return request('/goals', {
    method: 'POST',
    body: JSON.stringify(goal),
  }, token)
}

export function updateGoal(
  token: string,
  id: number,
  goal: { amount: number },
) {
  return request(`/goals/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(goal),
  }, token)
}
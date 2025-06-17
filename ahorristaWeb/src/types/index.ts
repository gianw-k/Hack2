export interface Category {
  id: number
  name: string
}

export interface SummaryItem {
  categoryId: number
  total: number
}

export interface Expense {
  id: number
  amount: number
  description: string
  date: string
}

export interface Goal {
  id: number
  year: number
  month: number
  amount: number
}
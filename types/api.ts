export interface User {
  id: number
  name: string
  email: string
  role: string
}

export interface LoginResponse {
  status: string
  message: string
  access_token: string
  token_type: string
  user: User
}

export interface Client {
  id: number
  user_id: number
  full_name: string
  email: string
  phone: string
  national_id: string
  address: string
  gender: string
  is_active: boolean
  units: Unit[]
  installments: Installment[]
  created_at: string
  updated_at: string
}

export interface Unit {
  id: number
  unit_number: string
  project_name: string
  unit_type: string
  // total_price: number
  down_payment: number
  number_of_installments: number
  location: string
  area: number
  bedrooms: number
  bathrooms: number
  status: string
  description: string | null
  created_at: string
  updated_at: string
}

export interface Installment {
  id: number
  client_id: number
  unit_id: number
  installment_number: number
  amount: number
  due_date: string
  paid_date: string | null
  status: 'paid' | 'pending' | 'late'
  paid_amount: number
  unit?: Unit
  client?: Client
  created_at: string
  updated_at: string
}

export interface ApiResponse<T> {
  status: string
  data: T
  message?: string
}
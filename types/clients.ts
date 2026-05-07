// types/clients.ts
export interface Client {
  id: number
  user_id: number
  full_name: string
  national_id: string
  phone: string
  email: string
  address: string
  gender: 'male' | 'female'
  is_active: number
  created_at: string
  updated_at: string
  units?: any[]
  installments?: any[]
}

export interface ApiResponse<T> {
  status: string
  data: T
}

export interface ClientsState {
  clients: Client[]
  loading: boolean
  error: string | null
}
import { Employee } from '@/types/config/company/employee'

export interface Company {
  name: string
  slogan: string
  employees: Employee[]
}

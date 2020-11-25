import { Employee } from '@/types/config/company/employee'

export interface Seat extends Employee {
  delay: number
  colorCode: string
}
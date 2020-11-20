export interface Employee {
  id: string
  name: string
  mainSection: number
  experienceLevel: number
  skills: []
}

export interface Employees {
  [index: number]: Employee
}

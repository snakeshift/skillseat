import { Color } from '@/types/config/common/color'

export interface MainSection {
  id: number
  sectionName: string
  seatColor: Color
}

export interface MainSections {
  [index: number]: MainSection
}

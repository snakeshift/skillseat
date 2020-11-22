import { ExperienceLevels } from '@/types/config/company/experienceLevel'

export enum EXPERIENCE_LEVEL_ID {
  ROOKIE = 1,
  LOW_LEVEL,
  MID_LEVEL,
  TOP_LEVEL,
  EXPERT
}

export const EXPERIENCE_LEVELS: ExperienceLevels = {
  [EXPERIENCE_LEVEL_ID.ROOKIE]: {
    id: 1,
    label: '新卒級 (目安: 1年目)'
  },
  [EXPERIENCE_LEVEL_ID.LOW_LEVEL]: {
    id: 2,
    label: '若手級 (目安: ~3年目)'
  },
  [EXPERIENCE_LEVEL_ID.MID_LEVEL]: {
    id: 3,
    label: '中堅級 (目安: ~5年目)'
  },
  [EXPERIENCE_LEVEL_ID.TOP_LEVEL]: {
    id: 4,
    label: '上位級 (目安: ~10年目)'
  },
  [EXPERIENCE_LEVEL_ID.EXPERT]: {
    id: 5,
    label: 'ベテラン級 (目安: 10年~)'
  }
}

import { MainSections } from '@/types/company/mainSection'

export enum MAIN_SECTION_IDS {
  SERVER = 1,
  FRONT_END,
  APPLICATION,
  INFRASTRUCTURE,
  NETWORK,
  SECURITY,
  DATABASE,
  IT_CONSULTANT,
  DATA_SCIENTIST,
  TECHNICAL_SUPPORT,
  TEST,
  OTHER
}

export const MAIN_SECTIONS: MainSections = {
  [MAIN_SECTION_IDS.SERVER]: {
    id: 1,
    sectionName: 'サーバーエンジニア',
    seatColor: 'indigo'
  },
  [MAIN_SECTION_IDS.FRONT_END]: {
    id: 2,
    sectionName: 'フロントエンドエンジニア',
    seatColor: 'amber'
  },
  [MAIN_SECTION_IDS.APPLICATION]: {
    id: 3,
    sectionName: 'アプリケーションエンジニア',
    seatColor: 'pink'
  },
  [MAIN_SECTION_IDS.INFRASTRUCTURE]: {
    id: 4,
    sectionName: 'インフラエンジニア',
    seatColor: 'deepPurple'
  },
  [MAIN_SECTION_IDS.NETWORK]: {
    id: 5,
    sectionName: 'ネットワークエンジニア',
    seatColor: 'teal'
  },
  [MAIN_SECTION_IDS.SECURITY]: {
    id: 6,
    sectionName: 'セキュリティエンジニア',
    seatColor: 'purple'
  },
  [MAIN_SECTION_IDS.DATABASE]: {
    id: 7,
    sectionName: 'データベースエンジニア',
    seatColor: 'blue'
  },
  [MAIN_SECTION_IDS.IT_CONSULTANT]: {
    id: 8,
    sectionName: 'ITコンサルタント',
    seatColor: 'lime'
  },
  [MAIN_SECTION_IDS.DATA_SCIENTIST]: {
    id: 9,
    sectionName: 'データサイエンティスト',
    seatColor: 'cyan'
  },
  [MAIN_SECTION_IDS.TECHNICAL_SUPPORT]: {
    id: 10,
    sectionName: 'テクニカルサポート',
    seatColor: 'lightGreen'
  },
  [MAIN_SECTION_IDS.TEST]: {
    id: 11,
    sectionName: 'テストエンジニア',
    seatColor: 'brown'
  },
  [MAIN_SECTION_IDS.OTHER]: {
    id: 12,
    sectionName: 'その他',
    seatColor: 'blueGrey'
  }
}

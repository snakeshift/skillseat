import { Ref, ref, onMounted } from '@vue/composition-api'
import { Seat } from '@/types/components/room/seat'
import { Company } from '@/types/config/company/company'
import { Employee } from '@/types/config/company/employee'
import { sleep } from '@/utils/sleep'
import { MAIN_SECTIONS } from '@/config/company/mainSections'
import { EXPERIENCE_LEVEL_ID } from '@/config/company/experienceLevel'
import { Color, BaseColor } from '@/types/config/common/color'
import colors from 'vuetify/lib/util/colors'

export const useSeat = (payload: {
  sorted: Ref<boolean>
  company: Company
  animationMilliseconds: Ref<number>
}) => {
  const { sorted, company, animationMilliseconds } = { ...payload }
  const seats = ref([] as Seat[])

  // 色取得
  const getColor = (employee: Employee): string => {
    const level = employee.experienceLevel
    const color: Color = MAIN_SECTIONS[employee.mainSection].seatColor

    const brightnessLevel = Math.abs(level - EXPERIENCE_LEVEL_ID.EXPERT) as
      | EXPERIENCE_LEVEL_ID.ROOKIE
      | EXPERIENCE_LEVEL_ID.LOW_LEVEL
      | EXPERIENCE_LEVEL_ID.MID_LEVEL
      | EXPERIENCE_LEVEL_ID.TOP_LEVEL
      | EXPERIENCE_LEVEL_ID.EXPERT

    const baseColor =
      level === EXPERIENCE_LEVEL_ID.EXPERT
        ? 'base'
        : (`lighten${brightnessLevel}` as BaseColor)

    const colorCode = colors[color][baseColor]
    return colorCode
  }

  // フィルター
  const setFilterBySection = (sectionId: number) => {
    console.log(sectionId)
  }

  // 席初期化
  const initSeats = async () => {
    const seatsNum = company.employees.length
    const durationMs = animationMilliseconds.value / seatsNum
    for (let i = 0; i < company.employees.length; i++) {
      const colorCode = getColor(company.employees[i])
      setTimeout(() => {
        seats.value.push({
          ...company.employees[i],
          delay: i * durationMs,
          colorCode
        })
      },i * durationMs)
    }
    await sleep(animationMilliseconds.value + animationMilliseconds.value * 1.2)
    sorted.value = true
  }

  return {
    seats,
    setFilterBySection,
    initSeats
  }
}

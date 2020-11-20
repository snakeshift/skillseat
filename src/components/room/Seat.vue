<template>
  <div class="seat">
    <div class="icon">
      <div class="topSeat" :style="{ backgroundColor: getColor() }"></div>
      <div class="bottomSeat" :style="{ backgroundColor: getColor() }"></div>
    </div>
  </div>
</template>

<script lang="ts">
import colors from 'vuetify/lib/util/colors'
import { defineComponent, PropType, onMounted } from '@vue/composition-api'
import { Employee } from '@/types/company/employee'
import { MAIN_SECTIONS } from '@/config/company/mainSections'
import { EXPERIENCE_LEVEL_ID } from '@/config/company/experienceLevel'
import { Color, BaseColor } from '@/types/config/common/color'

export default defineComponent({
  name: 'Seat',
  components: {},
  props: {
    employee: {
      type: Object as PropType<Employee>,
      default: () => {
        return {}
      }
    },
    sort: {
      type: Number,
      default: 1
    }
  },
  setup(props) {
    const getColor = (): string => {
      const level = props.employee.experienceLevel
      const color: Color = MAIN_SECTIONS[props.employee.mainSection].seatColor

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
    const getPosition = (): {
      x: number
      y: number
    } => {
      return {
        x: 1,
        y: 2
      }
    }
    onMounted(() => {
      // console.log(MAIN_SECTIONS)
    })
    return {
      getColor
    }
  }
})
</script>

<style lang="scss" scoped>
.seat {
  position: relative;
  .icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2px;
    .topSeat {
      height: 18px;
      width: 24px;
      border-radius: 4px;
    }
    .bottomSeat {
      height: 6px;
      width: 20px;
      margin-top: 3px;
      border-radius: 5px;
    }
  }
  // position: absolute;
}
</style>

<template>
  <div class="seat" :style="getPosition" :class="{ sorted: sorted }">
    <transition
      appear
      :enter-active-class="enterActiveClass"
      :leave-active-class="leaveActiveClass"
    >
      <div class="icon" v-show="!sorting.init || sorting.afterInit">
        <div class="topSeat" :style="{ backgroundColor: getColor() }"></div>
        <div class="bottomSeat" :style="{ backgroundColor: getColor() }"></div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import colors from 'vuetify/lib/util/colors'
import {
  defineComponent,
  PropType,
  onMounted,
  computed,
  reactive
} from '@vue/composition-api'
import { Employee } from '@/types/config/company/employee'
import { MAIN_SECTIONS } from '@/config/company/mainSections'
import { EXPERIENCE_LEVEL_ID } from '@/config/company/experienceLevel'
import { Color, BaseColor } from '@/types/config/common/color'
import { getRandWithBias } from '@/utils/rand'
import { sleep } from '@/utils/sleep'

interface Position {
  col: number
  row: number
}

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
    sorted: {
      type: Boolean,
      default: false
    },
    animationMilliseconds: {
      type: Number,
      default: 0
    },
    // sorting: {
    //   type: Boolean,
    //   default: false
    // },
    position: {
      type: Object as PropType<Position>,
      default: () => {
        return {}
      }
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
    const getPosition = computed(() => {
      // const randY = arrY[Math.floor(Math.random() * arrY.length)]
      // const randY = Math.floor(Math.random() * 101)
      const AREA_Y: { [key: number]: number } = {
        0: 0,
        1: 25, // y:0 → 25%の間
        2: 50, // y:25% → 50%の間
        3: 75, // y:50% → 75%の間
        4: 100 //  y:75% → 100%の間
      }
      const AREA_X: { [key: number]: number } = {
        0: 0,
        1: 10, // y:0 → 25%の間
        2: 20, // y:25% → 50%の間
        3: 30, // y:50% → 75%の間
        4: 100 //  y:75% → 100%の間
      }

      const randArea = getRandWithBias(AREA_Y) as 1 | 2 | 3 | 4
      const randPosY = Math.floor(
        Math.random() * (AREA_Y[randArea] - AREA_Y[randArea - 1]) +
          AREA_Y[randArea - 1]
      )
      const randPosX = Math.floor(Math.floor(Math.random() * AREA_X[randArea]))

      const randTop = `${randPosY}%`
      const randLeft = `${randPosX}%`
      // const randRotate = `${Math.floor(Math.random() * 361)}deg`
      const randRotate = '0deg'
      return {
        '--top-pos': randTop,
        '--left-pos': randLeft,
        '--rotate-deg': randRotate,
        '--row-pos': props.position.row,
        '--col-pos': props.position.col
      }
    })
    const sorting = reactive({
      init: false,
      afterInit: false
    })
    const setInitSorting = async () => {
      await sleep(500)
      sorting.init = true
      await sleep(props.animationMilliseconds + props.animationMilliseconds * 0.8)
      sorting.afterInit = true
      // await sleep(1000)
      // sorting.init = false
    }
    // 開始アニメーション
    const enterActiveClass = computed(() => {
      return sorting.afterInit && props.sorted
        ? 'animate__animated animate__backInDown animate__fast'
        : 'animate__animated animate__fadeInUp animate__faster'
    })
    // 終了アニメーション
    const leaveActiveClass = computed(() => {
      return 'animate__animated animate__fadeOutDown animate__fast'
    })
    onMounted(() => {
      setInitSorting()
      // console.log(MAIN_SECTIONS)
    })
    return {
      sorting,
      getColor,
      getPosition,
      enterActiveClass,
      leaveActiveClass
    }
  }
})
</script>

<style lang="scss" scoped>
.seat {
  /* ソート前使用のcss変数 */
  --top-pos: 0;
  --left-pos: 0;
  --rotate-deg: 0deg;

  /* ソート後使用のcss変数 */
  --row-pos: 1;
  --col-pos: 1;

  // 初期値
  position: absolute;
  top: var(--top-pos);
  left: var(--left-pos);
  transform: rotate(var(--rotate-deg));

  // transition: 0.2s;
  &.sorted {
    grid-row: var(--row-pos);
    grid-column: var(--col-pos);
    position: initial;
    top: initial;
    left: initial;
    transform: initial;
  }
  .icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2px;
    transition: 0.5s;
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

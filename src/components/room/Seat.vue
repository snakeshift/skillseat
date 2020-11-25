<template>
  <div class="seat" :style="getPosition" :class="{ sorted: sorted }">
    <transition
      appear
      @before-enter="beforeEnter"
      :enter-active-class="enterActiveClass"
      :leave-active-class="leaveActiveClass"
    >
      <div class="icon" v-show="!sorting.init || sorting.afterInit">
        <div class="topSeat" :style="{ backgroundColor: seat.colorCode }"></div>
        <div
          class="bottomSeat"
          :style="{ backgroundColor: seat.colorCode }"></div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  onMounted,
  computed,
  reactive
} from '@vue/composition-api'
import { Seat } from '@/types/components/room/seat'
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
    seat: {
      type: Object as PropType<Seat>,
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
    position: {
      type: Object as PropType<Position>,
      default: () => {
        return {}
      }
    }
  },
  setup(props) {
    const getPosition = computed(() => {
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
        '--animate-delay': `${props.seat.delay}ms`,
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
      await sleep(
        props.animationMilliseconds + props.animationMilliseconds * 0.8
      )
      sorting.afterInit = true
    }
    // 開始アニメーション
    const enterActiveClass = computed(() => {
      return sorting.afterInit && props.sorted
        ? 'animate__animated animate__backInDown animate__fast delayAnimatinon'
        : 'animate__animated animate__fadeInUp animate__faster delayAnimatinon'
    })
    // 終了アニメーション
    const leaveActiveClass = computed(() => {
      return 'animate__animated animate__fadeOutDown animate__fast delayAnimatinon'
    })

    const beforeEnter = (el: HTMLElement) => {
      // console.log(props.seat.delay + 'ms')
      // el.style.transitionDelay = props.seat.delay + 'ms'
      // console.log(el.style)
    }
    onMounted(() => {
      setInitSorting()
    })
    return {
      sorting,
      getPosition,
      enterActiveClass,
      leaveActiveClass,
      beforeEnter
    }
  }
})
</script>

<style lang="scss" scoped>
.seat {
  /* 遅延用のcss変数 */
  --animate-delay: 0;

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
    // transition: 0.5s;
    // transition-delay: 2s;
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
  .delayAnimatinon {
    // animation-delay: var(--animate-delay);
  }
}
</style>

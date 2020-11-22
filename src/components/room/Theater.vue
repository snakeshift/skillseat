<template>
  <div class="theater pa-10 w100p h100p pos-rel" :style="gridStyles">
    <div class="companyInfo flex-column" :class="{ sorted: sorted }">
      <div class="name">{{ company.name }}</div>
      <div class="slogan">{{ company.slogan }}</div>
    </div>
    <div class="h100p d-flex">
      <div
        class="seats flex-grow-1"
        :class="{ sorted: sorted }"
        ref="seatsGrid"
      >
        <template v-for="employee in seats">
          <Seat
            :key="employee.id"
            :employee="employee"
            :sorted="sorted"
            :position="gridPositions[employee.id]"
            :animationMilliseconds="animationMilliseconds"
          />
        </template>
      </div>
      <div v-if="sorted" class="sortZone">
        <p class="ml-2">Sections</p>
        <template v-for="section in mainSections">
          <div :key="section.id" v-if="grid.sections[section.id]">
          <v-chip :color="section.seatColor" label x-small class="ma-2" />
          <span class="sectionName">{{ section.sectionName }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { wrapGrid } from 'animate-css-grid'
import {
  defineComponent,
  PropType,
  ref,
  computed,
  onMounted
} from '@vue/composition-api'
import { Company } from '@/types/config/company/company'
import { Employee } from '@/types/config/company/employee'
import {
  DividedSeats,
  Grid,
  GridStyles,
  GridPositions
} from '@/types/components/room/theater'
import Seat from '@/components/room/Seat.vue'
import { MAIN_SECTIONS } from '@/config/company/mainSections'
import { sleep } from '@/utils/sleep'

export default defineComponent({
  name: 'Theater',
  components: {
    Seat
  },
  props: {
    company: {
      type: Object as PropType<Company>,
      default: () => {
        return {}
      }
    }
  },
  setup(props) {
    const seats = ref([] as Employee[])
    const sortType = ref(1)
    const sorted = ref(false)
    const seatsGrid = ref(null)
    const maxColNumPerSection = 5 // 1セクションにつき何行までか
    const animationMilliseconds = ref(1000) // オープン時アニメーション(ms)

    // 席を遅延かけて生成
    const initSeats = async () => {
      const seatsNum = props.company.employees.length
      const durationMs = animationMilliseconds.value / seatsNum
      for (let i = 0; i < props.company.employees.length; i++) {
        setTimeout(() => {
          seats.value.push(props.company.employees[i])
        }, i * durationMs)
      }

      await sleep(
        animationMilliseconds.value + animationMilliseconds.value * 1.2
      )
      sorted.value = true
    }

    // セクション、レベルごとに席を分ける
    const getDevideSeats = (): DividedSeats => {
      const dividedSeats: DividedSeats = {}
      // const dividedSeatsDesc: DividedSeats = {}
      for (const index in props.company.employees) {
        const employee = props.company.employees[index]
        const mainSection = employee.mainSection
        const experienceLevel = employee.experienceLevel

        if (!(mainSection in dividedSeats)) dividedSeats[mainSection] = {}
        if (!(experienceLevel in dividedSeats[mainSection]))
          dividedSeats[mainSection][experienceLevel] = {}

        dividedSeats[mainSection][experienceLevel][employee.id] = employee
      }

      // レベル降順にソート
      // for (const section in dividedSeats) {
      //   dividedSeatsDesc[section] = {}
      //   const levels = Object.keys(dividedSeats[section]).sort((a, b) =>
      //     a < b ? 1 : -1
      //   ) as string[] | number[]

      //   for (let level of levels) {
      //     console.log(level)
      //     level = Number(level)
      //     dividedSeatsDesc[section][level] = dividedSeats[section][level]
      //   }
      // }

      // console.log(dividedSeatsDesc)
      return dividedSeats
    }

    // 席のグリッド上の位置を取得
    const getGridPosition = (grid: Grid): GridPositions => {
      const dividedSeats = getDevideSeats()
      const gridPositions: GridPositions = {}
      const position = {
        col: 0,
        row: 0
      }
      for (const section in dividedSeats) {
        // セクションが切り替わったタイミングで位置の初期化
        position.row = 0
        position.col = grid.sections[section].startColNum
        for (const level in dividedSeats[section]) {
          // レベルが切り替わったタイミングで列数+1, 行数の初期化
          position.row++
          position.col = grid.sections[section].startColNum - 1
          for (const index in dividedSeats[section][level]) {
            // 折り返し地点に来たら列数+1, 行数の初期化
            if (position.col === grid.sections[section].endColNum) {
              position.row++
              position.col = grid.sections[section].startColNum
            } else {
              position.col++
            }
            const id = dividedSeats[section][level][index].id
            gridPositions[id] = {
              col: position.col,
              row: position.row
            }
          }
        }
      }
      return gridPositions
    }

    // グリッド生成
    const initGrid = (): {
      grid: Grid
      gridStyles: GridStyles
      gridPositions: GridPositions
    } => {
      const grid: Grid = {
        maxRowNum: 0,
        maxColNum: 0,
        sections: {}
      }
      const gridStyles: GridStyles = {
        '--max-row-num': 0,
        '--max-col-num': 0
      }

      const dividedSeats = getDevideSeats()
      let countColNum = 0
      for (const section in dividedSeats) {
        grid.sections[section] = {
          rowNum: 0,
          colNum: 0,
          startColNum: 0,
          endColNum: 0
        }
        for (const level in dividedSeats[section]) {
          const num = Object.keys(dividedSeats[section][level]).length

          // セクションごとの最大列数
          grid.sections[section].rowNum += Math.ceil(num / maxColNumPerSection)

          // セクションごとの最大行数
          grid.sections[section].colNum =
            num > maxColNumPerSection
              ? maxColNumPerSection
              : num > grid.sections[section].colNum
              ? num
              : grid.sections[section].colNum
        }
        // 行数カウントアップ
        countColNum++
        // 左から数えて何行目からスタートか
        grid.sections[section].startColNum = countColNum
        // 左から数えて何行目にエンドか
        grid.sections[section].endColNum =
          countColNum + grid.sections[section].colNum - 1
        // 次回セクションの行数セット
        countColNum = grid.sections[section].endColNum

        // 最大列数
        grid.maxRowNum =
          grid.sections[section].rowNum > grid.maxRowNum
            ? grid.sections[section].rowNum
            : grid.maxRowNum

        // 最大行数
        grid.maxColNum += grid.sections[section].colNum
      }
      gridStyles['--max-row-num'] = grid.maxRowNum
      gridStyles['--max-col-num'] = grid.maxColNum

      const gridPositions = getGridPosition(grid)
      return {
        grid,
        gridStyles,
        gridPositions
      }
    }

    const grid = computed(() => initGrid().grid)
    const gridStyles = computed(() => initGrid().gridStyles)
    const gridPositions = computed(() => initGrid().gridPositions)
    const mainSections = computed(() => MAIN_SECTIONS)

    onMounted(() => {
      const grid = seatsGrid.value
      if (grid !== null) {
        wrapGrid(grid, {
          stagger: 0,
          duration: 10,
          easing: 'backInOut'
        })
      }
      initSeats()
    })

    return {
      seats,
      animationMilliseconds,
      sortType,
      sorted,
      grid,
      gridStyles,
      gridPositions,
      seatsGrid,
      mainSections
    }
  }
})
</script>

<style lang="scss" scoped>
.theater {
  /* グリッド生成のためのcss変数定義 */
  --max-row-num: 0; // 最大横列数
  --max-col-num: 0; // 最大縦列数

  .companyInfo {
    z-index: 1;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translateY(-55%) translateX(-50%);
    text-align: center;
    width: 100%;
    transition: 1.8s;
    &.sorted {
      top: 80px;
    }
    .name {
      font-size: 20px;
    }
    .slogan {
      font-size: 14px;
      color: #9296ad;
      padding-top: 0;
    }
  }
  .seats {
    height: 100%;
    text-align: center;
    position: relative;
    display: grid;
    justify-content: center;
    grid-auto-rows: 50px;
    // grid-template-rows: repeat(auto-fill, 50px);
    grid-template-columns: repeat(auto-fill, 50px);
    // grid-auto-flow: column;
    // grid-auto-rows: 50px;
    // grid-auto-columns: 50px;
    transition: 0.5s;
    &.sorted {
      top: 110px;
      height: calc(100% - 110px);
      grid-template-rows: repeat(var(--max-row-num), 40px);
      grid-template-columns: repeat(var(--max-col-num), 40px);
    }
  }
  .sortZone {
    margin-top: 110px;
    width: 250px;
    .sectionName {
      font-size: 12px;
    }
  }
}
</style>

import { ref, computed, onMounted } from '@vue/composition-api'
import { Company } from '@/types/config/company/company'
import { wrapGrid } from 'animate-css-grid'
import {
  DividedSeats,
  Grid,
  GridStyles,
  GridPositions
} from '@/types/components/room/theater'

export const useGrid = (payload: {
  company: Company
  maxColNumPerSection: number
}) => {
  const { company, maxColNumPerSection } = { ...payload }
  const seatsGrid = ref(null) // grid要素

  // セクション、レベルごとに席を分ける
  const getDevideSeats = (): DividedSeats => {
    const dividedSeats: DividedSeats = {}
    for (const index in company.employees) {
      const employee = company.employees[index]
      const mainSection = employee.mainSection
      const experienceLevel = employee.experienceLevel

      if (!(mainSection in dividedSeats)) dividedSeats[mainSection] = {}
      if (!(experienceLevel in dividedSeats[mainSection]))
        dividedSeats[mainSection][experienceLevel] = {}

      dividedSeats[mainSection][experienceLevel][employee.id] = employee
    }
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

  const initGridAnimation = () => {
    const gridElm = seatsGrid.value
    if (gridElm !== null) {
      wrapGrid(gridElm, {
        stagger: 0,
        duration: 10,
        easing: 'backInOut'
      })
    }
  }

  const grid = computed(() => initGrid().grid)
  const gridStyles = computed(() => initGrid().gridStyles)
  const gridPositions = computed(() => initGrid().gridPositions)

  return {
    grid,
    gridStyles,
    gridPositions,
    seatsGrid,
    initGridAnimation
  }
}

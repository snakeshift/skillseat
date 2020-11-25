export interface DividedSeats {
  [key: number]: {
    [key: number]: {
      [key: string]: Employee
    }
  }
}

export interface Grid {
  maxRowNum: number
  maxColNum: number
  sections: {
    [key: number]: {
      rowNum: number
      colNum: number
      startColNum: number
      endColNum: number
    }
  }
}

export interface GridStyles {
  '--max-row-num': number
  '--max-col-num': number
}

interface GridPositions {
  [id: string]: {
    col: number
    row: number
  }
}

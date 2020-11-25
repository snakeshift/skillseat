const getTarget = (
  list: { [key in number | string]: number },
  hit: number | null = null
): number | string => {
  let area = 0
  for (const key in list) {
    area += list[key]
    if (hit && area >= hit) return key
  }
  return area
}

// 乱数(min ~ max)
const rand = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// 重み付き乱数生成
export const getRandWithBias = (list: { [key in number | string]: number }) => {
  const max = getTarget(list) as number
  const hit = rand(1, max) as number
  return getTarget(list, hit)
}

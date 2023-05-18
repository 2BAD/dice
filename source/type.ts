export type RollSpec = {
  sides: number
  quantity: number
  modifier: number
  separator: 'd' | 'z'
}

export type RollResult = {
  values: number[]
  sum: number
  min: number
  max: number
  isCritical: boolean
}

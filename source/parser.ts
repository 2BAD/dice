import { type RollSpec } from '~/type.ts'

const regex = /^(?:(?<quantity>\d+)|)(?<separator>d|z)(?<sides>[1-9]\d*)(?<modifiers>(?:[-+]\d+)*)?$/i

/**
 * Parses a string representing the dice notation and returns an object
 * with the number of dice, number of sides per die, and sum of any modifiers.
 *
 * @param notation - The dice notation string to be parsed. Ex: "2d6", "3d8", "1d20".
 * @throws Throws an error when it is not possible to parse the dice shape string.
 */
export const parse = (notation: string): RollSpec => {
  const match = regex.exec(notation.toLowerCase())
  if (match?.groups == null) {
    throw new Error(`Invalid dice notation '${notation}'`)
  }

  const { separator } = match.groups as { separator: 'd' | 'z' }
  const { quantity: quantityStr, sides: sidesStr } = match.groups
  const quantity = parseInt(quantityStr ?? '1', 10)
  const sides = parseInt(sidesStr ?? '', 10)

  const modifiersStr = match.groups['modifiers'] ?? ''
  const modifier = modifiersStr.match(/([-+]\d+)/g)?.reduce((a, c) => a + parseInt(c), 0) ?? 0

  return { quantity, sides, modifier, separator }
}

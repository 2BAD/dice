export type Dice = {
  sides: number
  dices: number
  modifier: number
}

/**
 * Parses a string representing the shape of a dice and returns an object
 * with the number of dice, number of sides per die, and sum of any modifiers.
 *
 * @param shape - The string representing the shape of the dice to be parsed. Ex: "2d6", "3d8", "1d20".
 * @throws Throws an error when it is not possible to parse the dice shape string.
 */

const regex = /^(?:(?<dices>\d+)|)(?<separator>d)(?<sides>[1-9]\d*)(?<modifiers>(?:[-+]\d+)*)?$/i

export const parse = (shape: string): Dice => {
  const match = regex.exec(shape.toLowerCase())
  if (match?.groups == null) {
    throw new Error(`Invalid dice shape '${shape}'`)
  }

  const { dices: dicesStr, sides: sidesStr } = match.groups
  const dices = parseInt(dicesStr ?? '1')
  const sides = parseInt(sidesStr ?? '')

  const modifiersStr = match.groups['modifiers'] ?? ''
  const modifier = modifiersStr.match(/([-+]\d+)/g)?.reduce((a, c) => a + parseInt(c), 0) ?? 0

  return { dices, sides, modifier }
}

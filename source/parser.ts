/* eslint-disable @typescript-eslint/strict-boolean-expressions */
export type Dice = {
  sides: number
  dices: number
}

/**
 * Function that parses a dice string and returns an object representing the number of dice and their sides.
 *
 * @param shape - The string representing the shape of the dice to be parsed. Ex: "2d6", "3d8", "1d20".
 * @throws Throws an error when it is not possible to parse the dice shape string.
 *
 */

export const parse = (shape: string): Dice => {
  const parts = shape.toLowerCase().split('d').map(Number)
  const [dices, sides] = parts

  if (parts.length > 2 || !sides || sides < 0 || typeof dices === 'undefined' || dices < 0 || isNaN(dices)) {
    throw new Error(`Invalid dice shape '${shape}'`)
  }

  // there should be at least one die
  return { dices: dices || 1, sides }
}

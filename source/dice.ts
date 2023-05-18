import { parse } from '~/parser'
import { rand } from '~/random/native'
import { sum } from '~/utils/array'
import { type Dice } from '~/type'

/**
 * Roll number of dice based on the provided notation and return the sum of all rolls.
 *
 * @param notation - The string representing the notation of the dice to be rolled. Ex: "2d6", "3d8", "1d20".
 */
export const roll = (notation: string): number => {
  return compute(parse(notation)).reduce(sum, 0)
}

/**
 * Generate an array of random numbers based on the provided dice parameters.
 *
 * @param Dice - A Dice object containing the dice, separator, sides and modifier properties.
 *                      Ex: { dice: 2, separator: "d", sides: 6, modifier: 0 }
 */
export const compute = ({ dice, separator, sides, modifier }: Dice): number[] => {
  const min = separator === 'z' ? 0 : 1
  const max = separator === 'z' ? sides - 1 : sides

  return Array(dice)
    .fill(null)
    .map(() => rand(max, min) + modifier)
}

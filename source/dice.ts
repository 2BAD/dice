import { parse } from '~/parser'
import { rand } from '~/random/native'
import { type RollSpec } from '~/type'
import { sum } from '~/utils/array'

/**
 * Roll number of dice based on the provided notation and return the sum of all rolls.
 *
 * @param notation - The string representing the notation of the dice to be rolled. Ex: "2d6", "3d8", "1d20".
 */
export const roll = (notation: string): number => {
  return compute(parse(notation)).reduce(sum, 0)
}

/**
 * Generate an array of random numbers based on the provided roll specification.
 *
 * @param RollSpec - An object containing the quantity, separator, sides and modifier properties.
 *                      Ex: { quantity: 2, separator: "d", sides: 6, modifier: 0 }
 */
export const compute = ({ quantity, separator, sides, modifier }: RollSpec): number[] => {
  const min = separator === 'z' ? 0 : 1
  const max = separator === 'z' ? sides - 1 : sides

  return Array(quantity)
    .fill(null)
    .map(() => rand(max, min) + modifier)
}

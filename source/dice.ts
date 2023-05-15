import { parse } from '~/parser'
import { rand } from '~/random/native'

/**
 * Generate dice rolls based on the provided shape.
 *
 * @param shape - The string representing the shape of the dice to be rolled. Ex: "2d6", "3d8", "1d20".
 *
 */

export const roll = (shape: string): number => {
  const { dices, sides } = parse(shape)
  return dices === 1
    ? rand(sides)
    : Array(dices)
        .fill(null)
        .reduce((sum: number) => sum + rand(sides), 0)
}

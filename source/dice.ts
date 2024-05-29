import { parse } from '~/parser.ts'
import { rand } from '~/random/native.ts'
import { type RollResult, type RollSpec } from '~/type.ts'
import { sortAsc, sortDesc, sum } from '~/utils/array.ts'

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

/**
 * A factory function for creating dice rolls.
 *
 * @param notation The notation string representing the type of roll to create, e.g. "2d6+3".
 * @returns An object with methods and properties representing the result of a dice roll.
 */
export const Roll = (notation: string): RollResult => {
  const spec = parse(notation)
  const rolls = compute(spec)

  return {
    values: rolls,
    get sum(): number {
      return rolls.reduce(sum, 0)
    },
    get min(): number {
      return rolls.sort(sortAsc)[0] ?? 0
    },
    get max(): number {
      return rolls.sort(sortDesc)[0] ?? 0
    },
    get isCritical(): boolean {
      return rolls.includes(1) || rolls.includes(20)
    }
  }
}

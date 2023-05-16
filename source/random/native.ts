/**
 *
 * Generates a random number between min and max, inclusive.
 * Uses xorshift128+ PRNG.
 *
 * @param max - The maximum value that can be returned.
 * @param min - The minimum value that can be returned (default: 1).
 */
export const rand = (max: number, min = 1): number => {
  return min + Math.floor(Math.random() * max)
}

/**
 * Generates a random number between 1 and `limit`, inclusive.
 * Using xorshift128+ PRNG
 *
 * @param limit - The maximum value that can be returned.
 *
 */
export const rand = (limit: number): number => {
  return 1 + Math.floor(Math.random() * limit)
}

/**
 * A compare function that can be used with Array.prototype.sort to sort an array of numbers in ascending order.
 *
 * @param a - The first number for comparison.
 * @param b - The second number for comparison.
 * @returns The difference between `a` and `b`.
 */
export const sortAsc = (a: number, b: number): number => a - b

/**
 * A compare function that can be used with Array.prototype.sort to sort an array of numbers in descending order.
 *
 * @param a - The first number for comparison.
 * @param b - The second number for comparison.
 * @returns The difference between `b` and `a`.
 */
export const sortDesc = (a: number, b: number): number => b - a

/**
 * Calculates the sum of two numbers.
 *
 * @param accumulator - The initial value of the sum.
 * @param value - The value to be added to the sum.
 * @returns The sum of the accumulator and the value.
 */
export const sum = (accumulator: number, value: number): number => accumulator + value

import { afterEach, describe, expect, it, vi } from 'vitest'
import { Roll, roll } from '~/dice.ts'
import * as parser from '~/parser.ts'
import * as random from '~/random/native.ts'

describe('dice', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('roll', () => {
    it('should return a number when given a valid dice string with only one die', () => {
      expect.assertions(3)

      const spy = vi.spyOn(parser, 'parse')

      const shape = '1d6'
      expect(typeof roll(shape)).toBe('number')
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(shape)
    })

    it('should return a number when given a valid dice string with multiple dice', () => {
      expect.assertions(1)

      const shape = '2d10'
      expect(typeof roll(shape)).toBe('number')
    })

    it('should correctly sum the rolls', () => {
      expect.assertions(2)

      // mock the rand function to return known values
      const spy = vi.spyOn(random, 'rand').mockReturnValueOnce(3).mockReturnValueOnce(5)

      const result = roll('2d6')

      expect(result).toBe(8)
      expect(spy).toHaveBeenCalledTimes(2)
    })

    it('should change min value when given `z` as separator', () => {
      expect.assertions(2)

      // mock the rand function to return known values
      const spy = vi.spyOn(random, 'rand')
      const shape = '3z8'

      expect(typeof roll(shape)).toBe('number')
      expect(spy).toHaveBeenCalledWith(7, 0)
    })

    it('should throw an error when given an invalid dice string', () => {
      expect.assertions(1)

      const shape = 'invalid'
      expect(() => roll(shape)).toThrow(`Invalid dice notation '${shape}'`)
    })
  })

  describe('roll factory', () => {
    describe('sum', () => {
      it('should correctly calculate the sum of the rolls', () => {
        expect.assertions(2)

        const roll = Roll('2d6')
        expect(roll.sum).toBeGreaterThanOrEqual(2)
        expect(roll.sum).toBeLessThanOrEqual(12)
      })
    })

    describe('min', () => {
      it('should correctly identify the minimum roll', () => {
        expect.assertions(1)

        vi.spyOn(random, 'rand')
          .mockReturnValueOnce(1)
          .mockReturnValueOnce(2)
          .mockReturnValueOnce(3)
          .mockReturnValueOnce(4)

        const roll = Roll('4d8+2')
        expect(roll.min).toBe(3)
      })
    })

    describe('max', () => {
      it('should correctly identify the maximum roll', () => {
        expect.assertions(1)

        vi.spyOn(random, 'rand')
          .mockReturnValueOnce(1)
          .mockReturnValueOnce(2)
          .mockReturnValueOnce(3)
          .mockReturnValueOnce(4)

        const roll = Roll('4d10+5')
        expect(roll.max).toBe(9)
      })
    })

    describe('isCritical', () => {
      it('should return true if a critical roll was made with nat 20', () => {
        expect.assertions(1)

        vi.spyOn(random, 'rand').mockReturnValueOnce(20)

        const roll = Roll('1d20')
        expect(roll.isCritical).toBeTruthy()
      })

      it('should return true if a critical roll was made with nat 1', () => {
        expect.assertions(1)

        vi.spyOn(random, 'rand').mockReturnValueOnce(1)

        const roll = Roll('1d20')
        expect(roll.isCritical).toBeTruthy()
      })

      it('should return false if a critical roll was not made', () => {
        expect.assertions(1)
        vi.spyOn(random, 'rand').mockReturnValueOnce(2)

        const roll = Roll('1d20')
        expect(roll.isCritical).toBeFalsy()
      })
    })
  })
})

import { Roll, roll } from '~/dice'
import * as parser from '~/parser'
import * as random from '~/random/native'

describe('dice', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('roll', () => {
    it('should return a number when given a valid dice string with only one die', () => {
      const spy = vi.spyOn(parser, 'parse')

      const shape = '1d6'
      expect(typeof roll(shape)).toBe('number')
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(shape)
    })

    it('should return a number when given a valid dice string with multiple dice', () => {
      const shape = '2d10'
      expect(typeof roll(shape)).toBe('number')
    })

    it('should correctly sum the rolls', () => {
      // mock the rand function to return known values
      const spy = vi.spyOn(random, 'rand').mockReturnValueOnce(3).mockReturnValueOnce(5)

      const result = roll('2d6')

      expect(result).toEqual(8)
      expect(spy).toHaveBeenCalledTimes(2)
    })

    it('should change min value when given `z` as separator', () => {
      // mock the rand function to return known values
      const spy = vi.spyOn(random, 'rand')
      const shape = '3z8'

      expect(typeof roll(shape)).toBe('number')
      expect(spy).toHaveBeenCalledWith(7, 0)
    })

    it('should throw an error when given an invalid dice string', () => {
      const shape = 'invalid'
      expect(() => roll(shape)).toThrow()
    })
  })

  describe('Roll', () => {
    describe('sum', () => {
      it('should correctly calculate the sum of the rolls', () => {
        const roll = Roll('2d6')
        expect(roll.sum).toBeGreaterThanOrEqual(2)
        expect(roll.sum).toBeLessThanOrEqual(12)
      })
    })

    describe('min', () => {
      it('should correctly identify the minimum roll', () => {
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
        vi.spyOn(random, 'rand').mockReturnValueOnce(20)

        const roll = Roll('1d20')
        expect(roll.isCritical).toBe(true)
      })

      it('should return true if a critical roll was made with nat 1', () => {
        vi.spyOn(random, 'rand').mockReturnValueOnce(1)

        const roll = Roll('1d20')
        expect(roll.isCritical).toBe(true)
      })

      it('should return false if a critical roll was not made', () => {
        vi.spyOn(random, 'rand').mockReturnValueOnce(2)

        const roll = Roll('1d20')
        expect(roll.isCritical).toBe(false)
      })
    })
  })
})

import * as parser from '~/parser'
import { roll } from '~/dice'

describe('roll', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should return a number when given a valid dice string with only one die', () => {
    const spy = vi.spyOn(parser, 'parse')

    const shape = '1d6'
    expect(typeof roll(shape)).toBe('number')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(shape)
  })

  it('should return an array of numbers when given a valid dice string with multiple dice', () => {
    const shape = '2d10'
    const result = roll(shape) as number[]
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(2)
    expect(typeof result[0]).toBe('number')
    expect(typeof result[1]).toBe('number')
  })

  it('should throw an error when given an invalid dice string', () => {
    const shape = 'invalid'
    expect(() => roll(shape)).toThrow()
  })
})

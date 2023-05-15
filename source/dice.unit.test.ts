import { roll } from '~/dice'
import * as parser from '~/parser'
import * as random from '~/random/native'

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

  it('should throw an error when given an invalid dice string', () => {
    const shape = 'invalid'
    expect(() => roll(shape)).toThrow()
  })
})

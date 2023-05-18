import { parse, type Dice } from './parser'

describe('parse', () => {
  const validInputs: Array<{ input: string; expected: Dice }> = [
    { input: 'z6', expected: { dice: 1, sides: 6, modifier: 0, separator: 'z' } },
    { input: 'd6', expected: { dice: 1, sides: 6, modifier: 0, separator: 'd' } },
    { input: '1d6', expected: { dice: 1, sides: 6, modifier: 0, separator: 'd' } },
    { input: '3z8', expected: { dice: 3, sides: 8, modifier: 0, separator: 'z' } },
    { input: 'D6', expected: { dice: 1, sides: 6, modifier: 0, separator: 'd' } },
    { input: '4d12', expected: { dice: 4, sides: 12, modifier: 0, separator: 'd' } },
    { input: 'd6+1', expected: { dice: 1, sides: 6, modifier: 1, separator: 'd' } },
    { input: 'd6+1-1', expected: { dice: 1, sides: 6, modifier: 0, separator: 'd' } },
    { input: 'd6-2-2', expected: { dice: 1, sides: 6, modifier: -4, separator: 'd' } }
  ]

  test.each(validInputs)(
    `should return the correct Dice object when passed a valid shape - '%j'`,
    ({ input, expected }) => {
      const actual = parse(input)
      expect(actual).toEqual(expected)
    }
  )

  const invalidInputs = ['', 'd', '4', '1dx', 'xd1', '-2d10', 'd-1', '2d0', '2d6d', '3d+2']

  test.each(invalidInputs)(`should throw an error when passed an invalid shape - '%s'`, (input) => {
    expect(() => parse(input)).toThrowError(`Invalid dice shape '${input}'`)
  })
})

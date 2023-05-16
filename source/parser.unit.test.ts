import { parse, type Dice } from './parser'

describe('parse', () => {
  const validInputs: Array<{ input: string; expected: Dice }> = [
    { input: 'd6', expected: { dices: 1, sides: 6, modifier: 0 } },
    { input: '1d6', expected: { dices: 1, sides: 6, modifier: 0 } },
    { input: 'D6', expected: { dices: 1, sides: 6, modifier: 0 } },
    { input: '4d12', expected: { dices: 4, sides: 12, modifier: 0 } },
    { input: 'd6+1', expected: { dices: 1, sides: 6, modifier: 1 } },
    { input: 'd6+1-1', expected: { dices: 1, sides: 6, modifier: 0 } },
    { input: 'd6-2-2', expected: { dices: 1, sides: 6, modifier: -4 } }
  ]

  test.each(validInputs)(
    `should return the correct Dice object when passed a valid shape - '%j'`,
    ({ input, expected }) => {
      const actual = parse(input)
      expect(actual).toEqual(expected)
    }
  )

  const invalidInputs = ['', 'd', '4', '1dx', 'xd1', '-2d10', 'd-1', '2d0', '2d6d']

  test.each(invalidInputs)(`should throw an error when passed an invalid shape - '%s'`, (input) => {
    expect(() => parse(input)).toThrowError(`Invalid dice shape '${input}'`)
  })
})

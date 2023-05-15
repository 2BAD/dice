import { parse, type Dice } from './parser'

describe('parse', () => {
  const validInputs: Array<{ input: string; expected: Dice }> = [
    { input: 'd6', expected: { dices: 1, sides: 6 } },
    { input: '1d6', expected: { dices: 1, sides: 6 } },
    { input: 'D6', expected: { dices: 1, sides: 6 } },
    { input: '4d12', expected: { dices: 4, sides: 12 } }
  ]

  test.each(validInputs)(
    `should return the correct Dice object when passed a valid shape - '%j'`,
    ({ input, expected }) => {
      const actual = parse(input)
      expect(actual).toEqual(expected)
    }
  )

  const invalidInputs = ['', 'd', '4', '1dx', 'xd1', 'd20+5', '-2d10', 'd-1', '2d0', '2d6d']

  test.each(invalidInputs)(`should throw an error when passed an invalid shape - '%s'`, (input) => {
    expect(() => parse(input)).toThrowError(`Invalid dice shape '${input}'`)
  })
})

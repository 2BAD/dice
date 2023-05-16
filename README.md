# Dice

[![NPM version](https://img.shields.io/npm/v/@2bad/dice)](https://www.npmjs.com/package/@2bad/dice)
[![License](https://img.shields.io/npm/l/@2bad/dice)](https://www.npmjs.com/package/@2bad/dice)
[![GitHub Build Status](https://img.shields.io/github/actions/workflow/status/2BAD/dice/build.yml)](https://github.com/2BAD/dice/actions/workflows/build.yml)
[![Code coverage](https://img.shields.io/codecov/c/github/2BAD/dice)](https://codecov.io/gh/2BAD/dice)
[![Written in TypeScript](https://img.shields.io/github/languages/top/2BAD/dice)](https://github.com/2BAD/dice/search?l=typescript)

This is a TypeScript library designed to facilitate the computation of dice rolls and random number generation. With support for various types and quantities of dice, it allows users to easily perform calculations for use in games, simulations, and other applications. Its RPG dice notation parsing capabilities allow users to roll based on specific game rules (e.g., `1d4`, `d6`, `2d6+5`, `1d20-1`). Whether building a character generator for a tabletop RPG or developing a gaming application, this utility library is an essential tool for any developer.

## Install

```shell
npm install @2bad/dice
```

**Warning:** This package is native [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) and no longer provides a CommonJS export. If your project uses CommonJS, you will have to [convert to ESM](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) or use the [dynamic `import()`](https://v8.dev/features/dynamic-import) function. Please don't open issues for questions regarding CommonJS / ESM.

## Usage

```typescript
import { roll } from '@2bad/dice'

// Roll a six-sided die with lowercase 'd'
roll('d6')
// same as
roll('D6')

// Roll two eight-sided dice
roll('2d8')

// Roll two twenty-sided dice
roll('2d20').
```

## Dice-Rolling with Modifier

In addition to rolling a single die or multiple dice, this dice-rolling program can also handle modifiers. A modifier is a number added to or subtracted from the total value obtained from the dice rolls. For instance, in DnD, instead of just rolling a 20-sided die (d20), you might also add a modifier to reflect a character's skill or level.

To roll a dice with a modifier, simply include a plus (+) or minus (-) sign and another integer at the end of your dice-roll string. Here are some examples:

- 2d6+3: Roll two six-sided dice and add 3 to the total value.
- d20-1: Roll a single 20-sided die and subtract 1 from the total value.
- 3d8+12: Roll three eight-sided dice and add 12 to the total value.

Note that the modifier applies to the entire result of the dice roll, not each individual die roll. When using a modifier, it's important to check the rules of your game system to determine which calculations are appropriate.

## Backus–Naur form grammar for dice roll string syntax

```
<dice-notation>   ::= <non-zero-number>? "d" <non-zero-number> <modifier>?
<modifier>        ::= ("+" | "-") <non-zero-number>
<non-zero-number> ::= <non-zero-digit> | <number>
<number>          ::= <non-zero-digit> <digit>*
<digit>           ::= "0" | <non-zero-digit>
<non-zero-digit>  ::= "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
```

This BNF grammar defines the syntax for a dice notation, which consists of a optional non-zero number of dice to be rolled and a number of sides each die has, optionally followed by a modifier that can be added to or subtracted from the result of the roll.

## Contributing

We welcome contributions! If you find a bug or want to request a new feature, please open an issue. If you want to submit a bug fix or new feature, please open a pull request.
